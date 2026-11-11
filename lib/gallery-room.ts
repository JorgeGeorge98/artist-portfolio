import * as THREE from "three";
import { artworks } from "@/content/artworks";

const ART_SPACING = 4.1;
const ART_HEIGHT = 1.65;
const CAMERA_DISTANCE = 3.8;
const LIGHT_FIXTURE_DEPTH = 0.85;
// Keep high-resolution images at a gallery scale without treating pixels as real dimensions.
// A shared scale preserves their relative image sizes until physical dimensions are supplied.
const PIXELS_PER_UNIT = Math.max(...artworks.map((artwork) => Math.max(artwork.width, artwork.height))) / 2.1;
const artX = (index: number) => (index - (artworks.length - 1) / 2) * ART_SPACING;

type Pan = { from: number; to: number; started: number; duration: number };
type RoomOptions = { onReady: () => void; onError: () => void };

export class GalleryRoom {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(48, 1, 0.08, 60);
  private renderer: THREE.WebGLRenderer;
  private observer: ResizeObserver;
  private textures = new Set<THREE.Texture>();
  private lights: THREE.SpotLight[] = [];
  private loading = new THREE.LoadingManager();
  private labels: { mesh: THREE.Mesh; x: number; artWidth: number; artHeight: number }[] = [];
  private disposed = false;
  private frame = 0;
  private pan: Pan | null = null;
  private focusX: number;
  private distance = CAMERA_DISTANCE;
  private cameraHeight = ART_HEIGHT;
  private selected: number;

  constructor(private host: HTMLElement, index: number, private options: RoomOptions, canvas: HTMLCanvasElement) {
    this.selected = index;
    this.focusX = artX(index);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.renderer.domElement.addEventListener("webglcontextlost", this.contextLost);
    this.host.append(this.renderer.domElement);

    this.scene.background = new THREE.Color("#e6e2d9");
    this.scene.fog = new THREE.Fog("#e6e2d9", 14, 35);
    this.loading.onLoad = () => { if (!this.disposed) this.options.onReady(); };
    this.buildArchitecture();
    this.buildPaintings();
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(this.host);
    document.addEventListener("visibilitychange", this.visibilityChanged);
    this.resize();
  }

  private box(width: number, height: number, depth: number, material: THREE.Material, x: number, y: number, z: number) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    return mesh;
  }

  private surfaceTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const context = canvas.getContext("2d");
    if (!context) return null;
    const pixels = context.createImageData(256, 256);
    let seed = 71;
    for (let i = 0; i < pixels.data.length; i += 4) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const grain = 222 + (seed % 23);
      pixels.data.set([grain, grain, grain, 255], i);
    }
    context.putImageData(pixels, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 4);
    this.textures.add(texture);
    return texture;
  }

  private buildArchitecture() {
    const roomWidth = artworks.length * ART_SPACING + 3.8;
    const grain = this.surfaceTexture();
    const wall = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      roughness: 0.68,
      metalness: 0,
      bumpMap: grain,
      bumpScale: 0.006,
      clearcoat: 0.12,
      clearcoatRoughness: 0.65,
    });
    const stone = new THREE.TextureLoader(this.loading).load("/textures/gallery-quartz.webp", (loaded) => {
      if (this.disposed) return;
      // Clone data maps only once image pixels exist, before the ready state clears.
      const mineralRoughness = loaded.clone();
      mineralRoughness.colorSpace = THREE.NoColorSpace;
      mineralRoughness.needsUpdate = true;
      wall.roughnessMap = mineralRoughness;
      wall.needsUpdate = true;
      this.textures.add(mineralRoughness);
      this.requestRender();
    }, undefined, () => {
      if (this.disposed) return;
      wall.map = wall.roughnessMap = null;
      wall.needsUpdate = true;
      this.requestRender();
    });
    stone.colorSpace = THREE.SRGBColorSpace;
    stone.wrapS = stone.wrapT = THREE.RepeatWrapping;
    stone.repeat.set(roomWidth / 3.2, 4.2 / 3.2);
    stone.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    wall.map = stone;
    this.textures.add(stone);
    const floor = new THREE.MeshStandardMaterial({ color: "#c6c2b8", roughness: 0.8, metalness: 0.025, bumpMap: grain, bumpScale: 0.004 });
    const ceiling = new THREE.MeshStandardMaterial({ color: "#faf9f5", roughness: 0.96 });
    const dark = new THREE.MeshStandardMaterial({ color: "#353735", roughness: 0.65 });
    this.box(roomWidth, 4.2, 0.2, wall, 0, 2.1, -0.12);
    this.box(roomWidth, 0.12, 11, floor, 0, -0.06, 5.4);
    this.box(roomWidth, 0.1, 11, ceiling, 0, 4.25, 5.4);
    this.box(0.15, 4.2, 11, wall, -roomWidth / 2, 2.1, 5.4);
    this.box(0.15, 4.2, 11, wall, roomWidth / 2, 2.1, 5.4);
    this.box(roomWidth, 0.065, 0.045, new THREE.MeshStandardMaterial({ color: "#e1ddd3", roughness: 0.9 }), 0, 0.035, 0.015);
    this.box(roomWidth - 0.6, 0.035, 0.04, dark, 0, 3.35, 0.035);

    // Fine floor joints and a low bench give the camera pan spatial context.
    const joint = new THREE.MeshStandardMaterial({ color: "#b8b3aa", roughness: 1 });
    for (let x = -6; x <= 6; x += 3) this.box(0.008, 0.002, 11, joint, x, 0.002, 5.4);
    for (let z = 2; z < 11; z += 3) this.box(roomWidth, 0.002, 0.008, joint, 0, 0.002, z);
    const oak = new THREE.MeshStandardMaterial({ color: "#bca17b", roughness: 0.8 });
    const bench = this.box(1.65, 0.085, 0.48, oak, 2.15, 0.48, 2.6);
    bench.castShadow = true;
    for (const x of [1.53, 2.77]) this.box(0.045, 0.44, 0.32, dark, x, 0.22, 2.6).castShadow = true;

    this.scene.add(new THREE.HemisphereLight("#fffaf0", "#b3aca0", 1.7));
    const daylight = new THREE.DirectionalLight("#edf4ff", 1.6);
    daylight.position.set(-5, 6, 8);
    this.scene.add(daylight);
  }

  private addSpotlight(x: number) {
    const position = new THREE.Vector3(x, 3.1, LIGHT_FIXTURE_DEPTH);
    const target = new THREE.Vector3(x, ART_HEIGHT - 0.05, 0);
    const direction = target.clone().sub(position).normalize();
    const metal = new THREE.MeshStandardMaterial({ color: "#303331", roughness: 0.6, metalness: 0.25 });
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.85, 8), metal);
    arm.position.set(x, 3.24, 0.45);
    arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().sub(new THREE.Vector3(x, 3.35, 0)).normalize());
    this.scene.add(arm);
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.19, 20), metal);
    lamp.position.copy(position);
    lamp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    this.scene.add(lamp);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.053, 20), new THREE.MeshBasicMaterial({ color: "#fff0c9", toneMapped: false }));
    lens.position.copy(position).addScaledVector(direction, 0.097);
    lens.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
    this.scene.add(lens);

    const light = new THREE.SpotLight("#fff0d6", 25, 7, 0.69, 0.82, 2);
    light.position.copy(position).addScaledVector(direction, 0.11);
    light.target.position.copy(target);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 7;
    light.shadow.bias = -0.00015;
    light.shadow.normalBias = 0.015;
    this.scene.add(light, light.target);
    this.lights.push(light);
  }

  private addLabel(index: number, x: number, width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 320;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "#fffdf7";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#d5d0c4";
    context.lineWidth = 4;
    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    context.fillStyle = "#192f29";
    context.font = "600 86px Arial";
    context.fillText(`${String(index + 1).padStart(2, "0")}  /  ${artworks[index].title}`, 60, 122);
    context.fillStyle = "#414943";
    context.font = "62px Arial";
    context.fillText(artworks[index].dimensions, 60, 242);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    this.textures.add(texture);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1, 320 / 1024), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
    this.labels.push({ mesh: label, x, artWidth: width, artHeight: height });
    this.scene.add(label);
  }

  private layoutLabels(viewportWidth: number) {
    const visibleWidth = 2 * this.distance * Math.tan(THREE.MathUtils.degToRad(24)) * this.camera.aspect;
    // Keep text at a readable screen size without backing the camera away from the artwork.
    const width = Math.max(0.88, 200 * visibleWidth / viewportWidth);
    const height = width * 320 / 1024;
    for (const label of this.labels) {
      label.mesh.scale.set(width, width, 1);
      const fitsBeside = label.artWidth / 2 + 0.18 + width < visibleWidth / 2 - 0.08;
      label.mesh.position.set(
        fitsBeside ? label.x + label.artWidth / 2 + 0.18 + width / 2 : label.x,
        fitsBeside
          ? ART_HEIGHT - label.artHeight / 2 + height / 2 + 0.04
          : Math.max(0.08 + height / 2, ART_HEIGHT - label.artHeight / 2 - 0.12 - height / 2),
        0.002,
      );
    }
  }

  private buildPaintings() {
    const loader = new THREE.TextureLoader(this.loading);
    const frame = new THREE.MeshStandardMaterial({ color: "#d7c5a6", roughness: 0.82 });
    artworks.forEach((artwork, index) => {
      const width = artwork.width / PIXELS_PER_UNIT;
      const height = artwork.height / PIXELS_PER_UNIT;
      const x = artX(index);
      this.box(width + 0.065, height + 0.065, 0.065, frame, x, ART_HEIGHT, 0.045).castShadow = true;
      const texture = loader.load(artwork.gallerySrc, () => {
        if (this.disposed) { texture.dispose(); return; }
        this.requestRender();
      }, undefined, () => { if (!this.disposed) this.options.onError(); });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
      this.textures.add(texture);
      // Preserve the source paintings' colors; the surrounding frame and wall receive the light.
      const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
      const painting = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
      painting.position.set(x, ART_HEIGHT, 0.08);
      this.scene.add(painting);
      this.addLabel(index, x, width, height);
      this.addSpotlight(x);
    });
    this.renderer.shadowMap.needsUpdate = true;
  }

  private resize = () => {
    if (this.disposed) return;
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    const widest = Math.max(...artworks.map((artwork) => artwork.width / PIXELS_PER_UNIT));
    this.distance = Math.max(CAMERA_DISTANCE, (widest + 0.45) / (2 * Math.tan(THREE.MathUtils.degToRad(24)) * this.camera.aspect));
    // Leave headroom above the projecting lamp, including in wide desktop views.
    // Move the camera and its target together to keep paintings straight-on.
    this.cameraHeight = Math.max(ART_HEIGHT, 3.3 - (this.distance - LIGHT_FIXTURE_DEPTH) * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)));
    this.layoutLabels(width);
    this.renderer.setSize(width, height, false);
    this.requestRender();
  };

  select(index: number, immediate = false) {
    if (this.disposed) return;
    const x = artX(index);
    this.selected = index;
    if (immediate || Math.abs(x - this.focusX) <= 0.001) {
      this.focusX = x;
      this.pan = null;
    } else {
      this.pan = { from: this.focusX, to: x, started: performance.now(), duration: Math.min(1900, 1150 + Math.abs(x - this.focusX) * 65) };
    }
    this.requestRender();
  }

  private requestRender = () => {
    if (!this.disposed && !this.frame && !document.hidden) this.frame = requestAnimationFrame(this.render);
  };

  private render = (now: number) => {
    this.frame = 0;
    if (this.disposed || document.hidden) return;
    let pullback = 0;
    if (this.pan) {
      const t = Math.min(1, (now - this.pan.started) / this.pan.duration);
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      this.focusX = THREE.MathUtils.lerp(this.pan.from, this.pan.to, eased);
      pullback = Math.sin(t * Math.PI) * 0.38;
      if (t === 1) this.pan = null;
    }
    this.camera.position.set(this.focusX, this.cameraHeight, this.distance + pullback);
    this.camera.lookAt(this.focusX, this.cameraHeight, 0);
    // Only nearby fixtures need GPU lights and shadow maps as the camera travels.
    for (const light of this.lights) {
      const nearby = Math.abs(light.position.x - this.focusX) < ART_SPACING * 1.6;
      if (light.visible !== nearby) {
        light.visible = nearby;
        this.renderer.shadowMap.needsUpdate = true;
      }
    }
    this.renderer.render(this.scene, this.camera);
    this.renderer.domElement.dataset.artwork = String(this.selected);
    this.renderer.domElement.dataset.panning = String(!!this.pan);
    if (this.pan) this.requestRender();
  };

  private visibilityChanged = () => {
    if (!document.hidden) this.requestRender();
  };

  private contextLost = (event: Event) => {
    event.preventDefault();
    if (!this.disposed) this.options.onError();
  };

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    document.removeEventListener("visibilitychange", this.visibilityChanged);
    this.renderer.domElement.removeEventListener("webglcontextlost", this.contextLost);
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    this.textures.forEach((texture) => texture.dispose());
    this.lights.forEach((light) => light.dispose());
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
