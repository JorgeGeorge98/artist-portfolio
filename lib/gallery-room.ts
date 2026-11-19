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

  private surfaceTexture(kind: "stone" | "oak") {
    const size = 512;
    const pixels = new Uint8Array(size * size * 4);
    // Periodic layers tile cleanly; deterministic grain avoids visible random seams.
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = x / size * Math.PI * 2, v = y / size * Math.PI * 2;
        const grain = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        const noise = grain - Math.floor(grain) - 0.5;
        const cloud = Math.sin(u + Math.sin(v)) * Math.cos(v * 2 - Math.sin(u * 2));
        const vein = Math.sin(v * 28 + Math.sin(u * 2) * 2 + Math.sin(v * 3));
        const value = kind === "oak" ? 176 + vein * 12 + cloud * 9 + noise * 9 : 222 + cloud * 5 + noise * 7;
        const offset = (y * size + x) * 4;
        pixels.set([value, value, value, 255], offset);
      }
    }
    const texture = new THREE.DataTexture(pixels, size, size);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
    this.textures.add(texture);
    return texture;
  }

  private softMask() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(64, 64, 10, 64, 64, 64);
    // alphaMap reads green, not alpha: fade RGB to black to avoid a hard disc.
    gradient.addColorStop(0, "rgb(255,255,255)");
    gradient.addColorStop(0.55, "rgb(166,166,166)");
    gradient.addColorStop(1, "rgb(0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    this.textures.add(texture);
    return texture;
  }

  private canvasShadow(width: number, height: number) {
    const size = 512;
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // A narrow, rectangular contact shadow in world units, not an oval halo.
        const dx = Math.max(0, Math.abs((x / (size - 1) - 0.5) * (width + 0.2)) - width / 2);
        const dy = Math.max(0, Math.abs((y / (size - 1) - 0.5) * (height + 0.2)) - height / 2);
        const value = Math.round(255 * Math.exp(-(dx * dx + dy * dy) / 0.0008));
        pixels.set([value, value, value, 255], (y * size + x) * 4);
      }
    }
    const texture = new THREE.DataTexture(pixels, size, size);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    this.textures.add(texture);
    return texture;
  }

  private buildArchitecture() {
    const length = artworks.length * SPACING + 12;
    const centre = (artworks.length - 1) * SPACING / 2;
    const wall = new THREE.MeshStandardMaterial({ color: "#f5f2eb", roughness: 0.92, normalScale: new THREE.Vector2(0.65, 0.65) });
    const stone = new THREE.TextureLoader().load("/textures/gallery-quartz.webp", texture => {
      if (this.disposed) { texture.dispose(); return; }
      this.requestRender();
    }, undefined, () => { wall.map = null; wall.needsUpdate = true; this.requestRender(); });
    stone.colorSpace = THREE.SRGBColorSpace;
    stone.wrapS = stone.wrapT = THREE.RepeatWrapping;
    stone.repeat.set(length / 2, 5.1 / 2);
    stone.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    wall.map = stone;
    this.textures.add(stone);
    for (const [slot, file] of [["normalMap", "normal"], ["roughnessMap", "roughness"]] as const) {
      const texture = new THREE.TextureLoader().load(`/textures/gallery-quartz-${file}.webp`, loaded => {
        if (this.disposed) { loaded.dispose(); return; }
        this.requestRender();
      }, undefined, () => { wall[slot] = null; wall.needsUpdate = true; this.requestRender(); });
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.copy(stone.repeat);
      texture.anisotropy = stone.anisotropy;
      wall[slot] = texture;
      this.textures.add(texture);
    }
    const floorGrain = this.surfaceTexture("stone");
    floorGrain.repeat.set(length / 3.4, 7.8 / 3.4);
    const floor = new THREE.MeshStandardMaterial({ color: "#c9c2b3", map: floorGrain, bumpMap: floorGrain, bumpScale: 0.009, roughnessMap: floorGrain, roughness: 0.72, metalness: 0 });
    const chalk = new THREE.MeshStandardMaterial({ color: "#f4f1e8", roughness: 0.9, emissive: "#e5e8e0", emissiveIntensity: 0.15 });
    const bronze = new THREE.MeshStandardMaterial({ color: "#414c4b", roughness: 0.48, metalness: 0.55 });
    this.box(length, 5.1, 0.2, wall, centre, 2.55, -0.14);
    this.box(length, 0.12, 7.8, floor, centre, -0.06, 3.8);
    this.box(length, 0.15, 7.8, chalk, centre, 5.15, 3.8);
    this.box(0.15, 5.1, 7.8, chalk, -9, 2.55, 3.8);
    this.box(0.15, 5.1, 7.8, chalk, centre + length / 2, 2.55, 3.8);
    // Recessed plinth and ceiling reveal give the long wall architectural depth.
    this.box(length, 0.045, 0.04, bronze, centre, 0.0225, 0.005);
    this.box(length, 0.055, 0.04, bronze, centre, 5.04, 0.005);
    const cove = new THREE.MeshBasicMaterial({ color: "#fff0d6" });
    this.box(length, 0.012, 0.045, cove, centre, 5.005, 0.03);
    // Glazed facade opposite the paintings, without an expensive refraction pass.
    const glass = new THREE.MeshStandardMaterial({ color: "#b6d8d6", transparent: true, opacity: 0.16, roughness: 0.18, metalness: 0.25, depthWrite: false, side: THREE.DoubleSide });
    this.box(length + 8, 12, 0.1, new THREE.MeshBasicMaterial({ color: "#dae6e4", fog: false, toneMapped: false }), centre, 5, 9);
    this.box(length + 8, 0.7, 0.1, new THREE.MeshBasicMaterial({ color: "#b9c5b3" }), centre, 0.25, 8.8);
    this.box(length, 4.8, 0.025, glass, centre, 2.55, 7.3);
    this.box(length, 0.065, 0.08, bronze, centre, 3.6, 7.3);
    this.box(length, 0.1, 0.12, bronze, centre, 0.15, 7.3);
    const joints = new THREE.MeshBasicMaterial({ color: "#b5afa3" });
    const softMask = this.softMask();
    const sunlight = new THREE.MeshBasicMaterial({ color: "#fff1ce", alphaMap: softMask, transparent: true, opacity: 0.42, depthWrite: false, side: THREE.DoubleSide });
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
    const wood = this.surfaceTexture("oak");
    wood.repeat.set(1, 2);
    const oak = new THREE.MeshStandardMaterial({ color: "#c2a47b", map: wood, bumpMap: wood, bumpScale: 0.004, roughness: 0.72 });
    const contactShadow = new THREE.MeshBasicMaterial({ color: "#47483f", alphaMap: softMask, transparent: true, opacity: 0.27, depthWrite: false });
    for (let i = 1; i < artworks.length; i += 4) {
      for (const offset of [-0.205, 0, 0.205]) this.box(2.1, 0.1, 0.195, oak, artX(i) + 3.4, 0.5, 5.5 + offset);
      for (const offset of [-0.8, 0.8]) this.box(0.06, 0.45, 0.45, bronze, artX(i) + 3.4 + offset, 0.23, 5.5);
      const shade = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.7), contactShadow);
      shade.rotation.x = -Math.PI / 2;
      shade.position.set(artX(i) + 3.4, 0.014, 5.5);
      this.scene.add(shade);
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
    const frame = new THREE.MeshStandardMaterial({ color: "#ae9470", roughness: 0.7, metalness: 0.08 });
    const recess = new THREE.MeshStandardMaterial({ color: "#3a3630", roughness: 0.95 });
    const metal = new THREE.MeshStandardMaterial({ color: "#444a46", roughness: 0.5, metalness: 0.3 });
    const glow = new THREE.MeshBasicMaterial({ color: "#fff1ce" });
    artworks.forEach((artwork, index) => {
      const { width, height } = paintingSize(artwork);
      const x = artX(index);
      const shadow = new THREE.MeshBasicMaterial({ color: "#514b40", alphaMap: this.canvasShadow(width + 0.09, height + 0.09), transparent: true, opacity: 0.1, depthWrite: false });
      const shade = new THREE.Mesh(new THREE.PlaneGeometry(width + 0.29, height + 0.29), shadow);
      shade.position.set(x + 0.008, ART_HEIGHT - 0.018, -0.032);
      this.scene.add(shade);
      this.box(width + 0.09, height + 0.09, 0.08, frame, x, ART_HEIGHT, 0.025);
      this.box(width + 0.045, height + 0.045, 0.009, recess, x, ART_HEIGHT, 0.069);
      const surface = relief.clone();
      // Keep the weave density consistent across differently sized canvases.
      surface.repeat.set(width * 3, height * 3);
      surface.needsUpdate = true;
      this.textures.add(surface);
      const material = new THREE.MeshPhysicalMaterial({
        color: "#ded7c9",
        roughness: 0.9,
        metalness: 0,
        bumpMap: surface,
        bumpScale: 0.0015,
        clearcoat: 0.06,
        clearcoatRoughness: 0.75,
        // Keep the artwork out of the room's cinematic highlight compression.
        toneMapped: false,
      });
      // Preserve the image's original pigments, with just a trace of surface
      // lighting so the canvas still belongs in the room rather than glowing.
      material.onBeforeCompile = shader => {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <opaque_fragment>",
          "outgoingLight = mix(diffuseColor.rgb, outgoingLight, 0.12);\n#include <opaque_fragment>",
        );
      };
      material.customProgramCacheKey = () => "gallery-pigment-preservation-v1";
      const painting = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
      painting.position.set(x, ART_HEIGHT, 0.083);
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
      if (!this.options.reducedMotion) this.pan = { from: this.focusX - 0.4, to: this.focusX, started: performance.now(), duration: 4800, entry: true };
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
    let arc = 0, entryTurn = 0;
    if (this.pan) {
      const t = Math.min(1, (now - this.pan.started) / this.pan.duration);
      // Hold the corridor briefly, then turn at a smoothly changing angular speed.
      const progress = this.pan.entry ? Math.max(0, (t - 0.1) / 0.9) : t;
      const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
      this.focusX = THREE.MathUtils.lerp(this.pan.from, this.pan.to, eased);
      arc = Math.sin(t * Math.PI);
      entryTurn = this.pan.entry ? (1 - eased) * THREE.MathUtils.degToRad(78) : 0;
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
    this.camera.lookAt(this.focusX + driftX + Math.sin(entryTurn) * this.distance + this.viewMix * 22 * viewDirection, ART_HEIGHT - 0.12 + driftY, (1 - Math.cos(entryTurn)) * this.distance + this.viewMix * this.distance);
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
