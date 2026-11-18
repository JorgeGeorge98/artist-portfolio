import * as THREE from "three";
import { artworks } from "@/content/artworks";

const SPACING = 6.8;
const ART_HEIGHT = 1.8;
const artX = (index: number) => index * SPACING;
// Physical dimensions, enlarged equally by 3 for the exhibition.
const paintingSize = (artwork: (typeof artworks)[number]) => {
  const match = artwork.dimensions.match(/([\d.,]+)\s*[×x]\s*([\d.,]+)\s*cm/i);
  if (!match) throw new Error(`Missing dimensions: ${artwork.title}`);
  const sides = match.slice(1, 3).map(value => Number(value.replace(",", ".")) * 0.03);
  const short = Math.min(...sides), long = Math.max(...sides);
  if (artwork.title === "Florecer y Renacer") return { width: short * 2, height: long };
  return artwork.width > artwork.height ? { width: long, height: short } : { width: short, height: long };
};
type Pan = { from: number; to: number; started: number; duration: number; entry?: boolean };
type Options = {
  reducedMotion: boolean;
  onReady: () => void;
  onError: () => void;
  onFrame: (bounds: { left: number; right: number; top: number; moving: boolean }) => void;
};

export class GalleryRoom {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(44, 1, 0.08, 65);
  private renderer: THREE.WebGLRenderer;
  private observer: ResizeObserver;
  private textures = new Set<THREE.Texture>();
  private materials: THREE.MeshPhysicalMaterial[] = [];
  private loaded = new Map<number, THREE.Texture>();
  private previews = new Map<number, THREE.Texture>();
  private pending = new Set<number>();
  private lights: THREE.SpotLight[] = [];
  private disposed = false;
  private frame = 0;
  private pan: Pan | null = null;
  private focusX: number;
  private distance = 4.5;
  private selected: number;
  private ready = false;
  private overview = false;
  private viewMix = 0;
  private lastFrame = 0;
  private driftTime = 0;
  private driftAmount = 0;

  constructor(private host: HTMLElement, index: number, private options: Options, canvas: HTMLCanvasElement) {
    this.selected = index;
    this.focusX = artX(index);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    canvas.setAttribute("aria-hidden", "true");
    canvas.addEventListener("webglcontextlost", this.contextLost);
    host.append(canvas);
    this.scene.background = new THREE.Color("#e9e9e1");
    this.scene.fog = new THREE.Fog("#e9e9e1", 19, 58);
    this.buildArchitecture();
    this.buildPaintings();
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(host);
    document.addEventListener("visibilitychange", this.visibilityChanged);
    this.resize();
    this.loadNearby();
  }

  private box(w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
    return mesh;
  }

  private buildArchitecture() {
    const length = artworks.length * SPACING + 12;
    const centre = (artworks.length - 1) * SPACING / 2;
    const wall = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.86 });
    const stone = new THREE.TextureLoader().load("/textures/gallery-quartz.webp", texture => {
      if (this.disposed) { texture.dispose(); return; }
      this.requestRender();
    }, undefined, () => { wall.map = null; wall.needsUpdate = true; this.requestRender(); });
    stone.colorSpace = THREE.SRGBColorSpace;
    stone.wrapS = stone.wrapT = THREE.RepeatWrapping;
    stone.repeat.set(length / 4, 1.3);
    wall.map = stone;
    this.textures.add(stone);
    const floor = new THREE.MeshStandardMaterial({ color: "#d2c9b6", roughness: 0.57, metalness: 0.04 });
    const chalk = new THREE.MeshStandardMaterial({ color: "#f4f1e8", roughness: 0.9, emissive: "#e5e8e0", emissiveIntensity: 0.15 });
    const bronze = new THREE.MeshStandardMaterial({ color: "#6d726c", roughness: 0.42, metalness: 0.45 });
    this.box(length, 5.1, 0.2, wall, centre, 2.55, -0.14);
    this.box(length, 0.12, 7.8, floor, centre, -0.06, 3.8);
    this.box(length, 0.15, 7.8, chalk, centre, 5.15, 3.8);
    this.box(0.15, 5.1, 7.8, chalk, -9, 2.55, 3.8);
    this.box(0.15, 5.1, 7.8, chalk, centre + length / 2, 2.55, 3.8);
    this.box(length, 0.06, 0.06, bronze, centre, 0.03, 0.01);
    // Glazed facade opposite the paintings, without an expensive refraction pass.
    const glass = new THREE.MeshStandardMaterial({ color: "#b6d8d6", transparent: true, opacity: 0.16, roughness: 0.18, metalness: 0.25, depthWrite: false, side: THREE.DoubleSide });
    this.box(length + 8, 12, 0.1, new THREE.MeshBasicMaterial({ color: "#dae6e4", fog: false, toneMapped: false }), centre, 5, 9);
    this.box(length + 8, 0.7, 0.1, new THREE.MeshBasicMaterial({ color: "#b9c5b3" }), centre, 0.25, 8.8);
    this.box(length, 4.8, 0.025, glass, centre, 2.55, 7.3);
    this.box(length, 0.065, 0.08, bronze, centre, 3.6, 7.3);
    this.box(length, 0.1, 0.12, bronze, centre, 0.15, 7.3);
    const joints = new THREE.MeshBasicMaterial({ color: "#bcb5a7" });
    const sunlight = new THREE.MeshBasicMaterial({ color: "#fff4ca", transparent: true, opacity: 0.29, depthWrite: false, side: THREE.DoubleSide });
    const shadow = new THREE.MeshBasicMaterial({ color: "#7b837e", transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide });
    for (let x = -7; x < length - 9; x += 3.4) {
      this.box(0.065, 5.1, 0.1, bronze, x, 2.55, 7.3);
      this.box(0.007, 0.003, 7.4, joints, x, 0.003, 3.7);
      // Static sun patches and mullion shadows avoid continuous shadow rendering.
      const patch = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 6.3), sunlight);
      patch.rotation.set(-Math.PI / 2, 0, -0.28);
      patch.position.set(x - 1, 0.008, 4.1);
      this.scene.add(patch);
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 7), shadow);
      line.rotation.copy(patch.rotation);
      line.position.set(x + 0.55, 0.012, 3.9);
      this.scene.add(line);
    }
    for (const z of [1.8, 3.6, 5.4]) this.box(length, 0.003, 0.007, joints, centre, 0.003, z);
    const oak = new THREE.MeshStandardMaterial({ color: "#ab8961", roughness: 0.77 });
    for (let i = 1; i < artworks.length; i += 4) {
      this.box(2.1, 0.12, 0.6, oak, artX(i) + 3.4, 0.5, 5.5);
      for (const offset of [-0.8, 0.8]) this.box(0.06, 0.45, 0.45, bronze, artX(i) + 3.4 + offset, 0.23, 5.5);
    }
    this.scene.add(new THREE.HemisphereLight("#f5f8f4", "#b2a38c", 2));
    const sun = new THREE.DirectionalLight("#fff7e8", 1.7);
    sun.position.set(-12, 10, 7);
    this.scene.add(sun);
  }

  private canvasRelief() {
    const size = 256;
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // A seamless woven surface, with slight irregularity in the threads.
        const warp = Math.cos(x * Math.PI / 4);
        const weft = Math.cos(y * Math.PI / 4);
        const grain = Math.sin(x * Math.PI / 16 + Math.sin(y * Math.PI / 32)) * 0.12;
        const value = Math.round(128 + 33 * warp + 33 * weft + 18 * warp * weft + 25 * grain);
        const offset = (y * size + x) * 4;
        pixels.set([value, value, value, 255], offset);
      }
    }
    const texture = new THREE.DataTexture(pixels, size, size);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
    this.textures.add(texture);
    return texture;
  }

  private buildPaintings() {
    const relief = this.canvasRelief();
    const frame = new THREE.MeshStandardMaterial({ color: "#b99b71", roughness: 0.68, metalness: 0.12 });
    const metal = new THREE.MeshStandardMaterial({ color: "#444a46", roughness: 0.5, metalness: 0.3 });
    const glow = new THREE.MeshBasicMaterial({ color: "#fff1ce" });
    const shadow = new THREE.MeshBasicMaterial({ color: "#655f51", transparent: true, opacity: 0.12 });
    artworks.forEach((artwork, index) => {
      const { width, height } = paintingSize(artwork);
      const x = artX(index);
      this.box(width + 0.12, height + 0.12, 0.008, shadow, x + 0.035, ART_HEIGHT - 0.035, -0.025);
      this.box(width + 0.055, height + 0.055, 0.07, frame, x, ART_HEIGHT, 0.03);
      const surface = relief.clone();
      // Keep the weave density consistent across differently sized canvases.
      surface.repeat.set(width * 3, height * 3);
      surface.needsUpdate = true;
      this.textures.add(surface);
      const material = new THREE.MeshPhysicalMaterial({
        color: "#ded7c9",
        roughness: 0.78,
        metalness: 0,
        bumpMap: surface,
        bumpScale: 0.0015,
        clearcoat: 0.3,
        clearcoatRoughness: 0.42,
      });
      const painting = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
      painting.position.set(x, ART_HEIGHT, 0.071);
      this.materials.push(material);
      this.scene.add(painting);
      this.box(1.2, 0.035, 0.04, metal, x, 4.2, 0.08);
      this.box(0.025, 0.025, 0.65, metal, x, 4.2, 0.4);
      this.box(0.17, 0.1, 0.23, metal, x, 4.17, 0.73);
      this.box(0.13, 0.008, 0.18, glow, x, 4.114, 0.73);
      const light = new THREE.SpotLight("#fff1d6", 15, 6, 0.76, 0.9, 2);
      light.position.set(x, 4.1, 0.75);
      light.target.position.set(x, ART_HEIGHT, 0);
      light.visible = false;
      this.scene.add(light, light.target);
      this.lights.push(light);
    });
  }

  private loadNearby() {
    // Evict distant textures so memory stays bounded throughout a complete tour.
    for (const [index, texture] of this.loaded) {
      if (Math.abs(index - this.selected) > 4) {
        this.materials[index].map = this.previews.get(index) ?? null;
        this.materials[index].color.set(this.previews.has(index) ? "#ffffff" : "#ded7c9");
        this.materials[index].needsUpdate = true;
        texture.dispose();
        this.loaded.delete(index);
      }
    }
    for (const offset of [0, -1, 1, -2, 2]) {
      const index = this.selected + offset;
      if (!artworks[index] || this.loaded.has(index) || this.pending.has(index)) continue;
      this.pending.add(index);
      new THREE.TextureLoader().load(artworks[index].gallerySrc, texture => {
        this.pending.delete(index);
        if (this.disposed || Math.abs(index - this.selected) > 4) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
        this.loaded.set(index, texture);
        this.materials[index].map = texture;
        this.materials[index].color.set("#ffffff");
        this.materials[index].needsUpdate = true;
        if (index === this.selected) this.paintingReady();
        this.requestRender();
      }, undefined, () => {
        this.pending.delete(index);
        if (!this.disposed && index === this.selected) this.options.onError();
      });
    }
    if (this.loaded.has(this.selected)) this.paintingReady();
  }

  private paintingReady() {
    if (!this.ready) {
      this.ready = true;
      // Small previews fill the distant corridor after the first painting is ready.
      // Two sequential queues avoid a burst of full-resolution texture downloads.
      void this.loadPreviews(0);
      void this.loadPreviews(1);
      if (!this.options.reducedMotion) this.pan = { from: this.focusX - 0.65, to: this.focusX, started: performance.now(), duration: 2400, entry: true };
    }
    this.options.onReady();
  }

  private async loadPreviews(start: number) {
    const loader = new THREE.TextureLoader();
    for (let index = start; index < artworks.length && !this.disposed; index += 2) {
      try {
        const texture = await loader.loadAsync(encodeURI(`/optimized${artworks[index].src}/320.webp`));
        if (this.disposed) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        this.previews.set(index, texture);
        if (!this.loaded.has(index)) {
          this.materials[index].map = texture;
          this.materials[index].color.set("#ffffff");
          this.materials[index].needsUpdate = true;
          this.requestRender();
        }
      } catch { /* A failed distant preview does not interrupt the selected artwork. */ }
    }
  }

  private resize = () => {
    if (this.disposed) return;
    const width = this.host.clientWidth, height = this.host.clientHeight;
    if (!width || !height) return;
    const compact = width < 900;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.35 : 1.75));
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    const sizes = artworks.map(paintingSize);
    const tangent = Math.tan(THREE.MathUtils.degToRad(22));
    this.distance = Math.max(4.05, Math.max(...sizes.map(size => size.width)) / (2 * tangent * this.camera.aspect * (compact ? 0.8 : 0.42)), Math.max(...sizes.map(size => size.height)) / (2 * tangent * 0.72));
    this.renderer.setSize(width, height, false);
    this.requestRender();
  };

  select(index: number, immediate = false) {
    if (this.disposed) return;
    this.options.reducedMotion = immediate;
    this.overview = false;
    const changed = index !== this.selected;
    const jump = Math.abs(index - this.selected) > 3;
    this.selected = index;
    const x = artX(index);
    if (immediate) { this.focusX = x; this.pan = null; }
    else if (changed) this.pan = { from: jump ? x - 2 : this.focusX, to: x, started: performance.now(), duration: jump ? 1250 : Math.min(2100, 1250 + Math.abs(x - this.focusX) * 25) };
    this.loadNearby();
    this.requestRender();
  }

  setOverview(overview: boolean) {
    this.overview = overview;
    this.requestRender();
  }

  private requestRender = () => {
    if (!this.disposed && !this.frame && !document.hidden) this.frame = requestAnimationFrame(this.render);
  };
  private render = (now: number) => {
    this.frame = 0;
    if (this.disposed || document.hidden) return;
    const delta = Math.min((now - this.lastFrame) / 1000, 0.05);
    this.lastFrame = now;
    const targetMix = this.overview ? 1 : 0;
    this.viewMix = this.options.reducedMotion ? targetMix : THREE.MathUtils.damp(this.viewMix, targetMix, 5, delta);
    if (Math.abs(this.viewMix - targetMix) < 0.001) this.viewMix = targetMix;
    let arc = 0, lookAhead = 0, lookZ = 0;
    if (this.pan) {
      const t = Math.min(1, (now - this.pan.started) / this.pan.duration);
      const eased = t * t * t * (t * (t * 6 - 15) + 10);
      this.focusX = THREE.MathUtils.lerp(this.pan.from, this.pan.to, eased);
      arc = Math.sin(t * Math.PI);
      lookAhead = this.pan.entry ? (1 - eased) * 0.18 : 0;
      lookZ = this.pan.entry ? (1 - eased) * 0.08 : 0;
      if (t === 1) this.pan = null;
    }
    const viewDirection = this.selected >= artworks.length - 2 ? -1 : 1;
    const drifting = this.ready && !this.pan && !this.overview && this.loaded.has(this.selected) && !this.options.reducedMotion;
    this.driftAmount = this.options.reducedMotion ? 0 : THREE.MathUtils.damp(this.driftAmount, drifting ? 1 : 0, 2.5, delta);
    if (!document.hidden) this.driftTime += delta;
    const driftX = Math.sin(this.driftTime * 0.55) * 0.022 * this.driftAmount;
    const driftY = Math.sin(this.driftTime * 0.43) * 0.015 * this.driftAmount;
    // Translate the camera and target together to keep the artwork straight-on.
    this.camera.position.set(this.focusX - 0.16 + driftX, ART_HEIGHT - 0.12 + driftY, this.distance + arc * 0.08);
    this.camera.lookAt(this.focusX + driftX + lookAhead + this.viewMix * 22 * viewDirection, ART_HEIGHT - 0.12 + driftY, lookZ + this.viewMix * this.distance);
    for (const light of this.lights) light.visible = Math.abs(light.position.x - this.focusX) < SPACING * 1.1;
    this.renderer.render(this.scene, this.camera);
    const { width, height } = paintingSize(artworks[this.selected]);
    // Cancel the camera's idle translation when projecting HUD anchors.
    // The painting drifts naturally while its information remains steady.
    const left = new THREE.Vector3(artX(this.selected) - width / 2 + driftX, ART_HEIGHT + height / 2 + driftY, 0.08).project(this.camera);
    const right = new THREE.Vector3(artX(this.selected) + width / 2 + driftX, ART_HEIGHT + driftY, 0.08).project(this.camera);
    this.options.onFrame({ left: (left.x + 1) / 2 * this.host.clientWidth, right: (right.x + 1) / 2 * this.host.clientWidth, top: (1 - left.y) / 2 * this.host.clientHeight, moving: !!this.pan || this.viewMix > 0.01 || !this.loaded.has(this.selected) });
    this.renderer.domElement.dataset.artwork = String(this.selected);
    this.renderer.domElement.dataset.panning = String(!!this.pan);
    this.renderer.domElement.dataset.textures = String(this.loaded.size);
    if (this.pan || this.viewMix !== targetMix || drifting || this.driftAmount > 0.001) this.requestRender();
  };
  private visibilityChanged = () => { if (!document.hidden) this.requestRender(); };
  private contextLost = (event: Event) => { event.preventDefault(); if (!this.disposed) this.options.onError(); };

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    document.removeEventListener("visibilitychange", this.visibilityChanged);
    this.renderer.domElement.removeEventListener("webglcontextlost", this.contextLost);
    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => material.dispose());
      }
    });
    this.textures.forEach(texture => texture.dispose());
    this.loaded.forEach(texture => texture.dispose());
    this.previews.forEach(texture => texture.dispose());
    this.lights.forEach(light => light.dispose());
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
