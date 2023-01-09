import * as spine from '@esotericsoftware/spine-webgl';

export default class SpineController {
  protected canvas: HTMLCanvasElement | undefined;
  protected spineRes: SpineRes[] | undefined;

  protected ctx: spine.ManagedWebGLRenderingContext | undefined;
  protected shader: spine.Shader | undefined;
  protected batcher: spine.PolygonBatcher | undefined;
  protected mvp = new spine.Matrix4();
  protected skeletonRenderer: spine.SkeletonRenderer | undefined;
  protected assetManager: spine.AssetManager | undefined;
  protected debugRenderer: spine.SkeletonDebugRenderer | undefined;
  protected debugShader: spine.Shader | undefined;
  protected shapes: spine.ShapeRenderer | undefined;

  protected lastFrameTime: number | undefined;
  protected skeletons: { [key: string]: any } = {};
  protected format = 'JSON';
  protected activeSkeleton = 'spineboy';

  constructor() {
    console.log('SpineController');
  }

  public init(canvas: HTMLCanvasElement, spineRes: SpineRes[]) {
    console.log('spine init');
    this.canvas = canvas;
    this.spineRes = spineRes;
    const config = { alpha: true };
    this.ctx = new spine.ManagedWebGLRenderingContext(canvas, config);
    if (!this.ctx.gl) {
      alert('WebGL is unavailable.');
      return;
    }

    // Create a simple shader, mesh, model-view-projection matrix, SkeletonRenderer, and AssetManager.
    this.shader = spine.Shader.newTwoColoredTextured(this.ctx);
    this.batcher = new spine.PolygonBatcher(this.ctx);
    this.mvp.ortho2d(0, 0, canvas.width - 1, canvas.height - 1);
    this.skeletonRenderer = new spine.SkeletonRenderer(this.ctx);
    this.assetManager = new spine.AssetManager(this.ctx, '/');

    // Create a debug renderer and the ShapeRenderer it needs to render lines.
    this.debugRenderer = new spine.SkeletonDebugRenderer(this.ctx);
    this.debugRenderer.drawRegionAttachments = true;
    this.debugRenderer.drawBoundingBoxes = true;
    this.debugRenderer.drawMeshHull = true;
    this.debugRenderer.drawMeshTriangles = true;
    this.debugRenderer.drawPaths = true;
    this.debugShader = spine.Shader.newColored(this.ctx);
    this.shapes = new spine.ShapeRenderer(this.ctx);

    // Tell AssetManager to load the resources for each skeleton, including the exported data file, the .atlas file and the .png
    // file for the atlas. We then wait until all resources are loaded in the load() method.
    for (const res of spineRes) {
      this.assetManager.loadBinary(res.binary);
      this.assetManager.loadText(res.json);
      this.assetManager.loadTextureAtlas(res.texture);
    }
    requestAnimationFrame(this.load.bind(this));
  }

  protected load() {
    // Wait until the AssetManager has loaded all resources, then load the skeletons.
    if (this.assetManager!.isLoadingComplete()) {
      this.skeletons = {};
      for (const res of this.spineRes!) {
        this.skeletons[res.name] = {
          Binary: this.loadSkeleton(res.binary, res.texture, 'run', true),
          JSON: this.loadSkeleton(res.json, res.texture, 'run', true),
        };
      }
      // this.setupUI();
      this.lastFrameTime = Date.now() / 1000;
      requestAnimationFrame(this.render.bind(this)); // Loading is done, call render every frame.
    } else requestAnimationFrame(this.load.bind(this));
  }

  protected loadSkeleton(
    name: string,
    texture: string,
    initialAnimation: string,
    premultipliedAlpha: boolean,
    skin?: string
  ) {
    if (skin === undefined) skin = 'default';

    // Load the texture atlas using name.atlas from the AssetManager.
    const atlas = this.assetManager!.get(texture);

    // Create an AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas);

    // Create a skeleton loader instance for parsing the skeleton data file.
    const skeletonLoader = name.endsWith('.skel')
      ? new spine.SkeletonBinary(atlasLoader)
      : new spine.SkeletonJson(atlasLoader);

    // Set the scale to apply during parsing, parse the file, and create a new skeleton.
    skeletonLoader.scale = 1;
    const skeletonData = skeletonLoader.readSkeletonData(this.assetManager!.require(name));
    const skeleton = new spine.Skeleton(skeletonData);
    skeleton.setSkinByName(skin);
    const bounds = this.calculateSetupPoseBounds(skeleton);

    // Create an AnimationState, and set the initial animation in looping mode.
    const animationStateData = new spine.AnimationStateData(skeleton.data);
    const animationState = new spine.AnimationState(animationStateData);
    if (name == 'spineboy-pro.skel' || name == 'spineboy-pro.json') {
      animationStateData.setMix('walk', 'run', 1.5);
      animationStateData.setMix('run', 'jump', 0.2);
      animationStateData.setMix('jump', 'run', 0.4);
      animationState.setEmptyAnimation(0, 0);
      let entry = animationState.addAnimation(0, 'walk', true, 0);
      entry.mixDuration = 1;
      animationState.addAnimation(0, 'run', true, 1.5);
      animationState.addAnimation(0, 'jump', false, 2);
      animationState.addAnimation(0, 'run', true, 0);
      animationState.addEmptyAnimation(0, 1, 1);
      entry = animationState.addAnimation(0, 'walk', true, 1.5);
      entry.mixDuration = 1;
    } else animationState.setAnimation(0, initialAnimation, true);

    function log(message: string) {
      if ((document.getElementById('#debug') as HTMLInputElement)?.checked) console.log(message);
    }
    animationState.addListener({
      start: function (track) {
        log('Animation on track ' + track.trackIndex + ' started');
      },
      interrupt: function (track) {
        log('Animation on track ' + track.trackIndex + ' interrupted');
      },
      end: function (track) {
        log('Animation on track ' + track.trackIndex + ' ended');
      },
      dispose: function (track) {
        log('Animation on track ' + track.trackIndex + ' disposed');
      },
      complete: function (track) {
        log('Animation on track ' + track.trackIndex + ' completed');
      },
      event: function (track, event) {
        log('Event on track ' + track.trackIndex + ': ' + JSON.stringify(event));
      },
    });

    // Pack everything up and return to caller.
    return {
      skeleton: skeleton,
      state: animationState,
      bounds: bounds,
      premultipliedAlpha: premultipliedAlpha,
    };
  }

  protected calculateSetupPoseBounds(skeleton: spine.Skeleton) {
    skeleton.setToSetupPose();
    skeleton.updateWorldTransform();
    const offset = new spine.Vector2();
    const size = new spine.Vector2();
    skeleton.getBounds(offset, size, []);
    return { offset: offset, size: size };
  }

  protected render() {
    const gl = this.ctx!.gl;
    const now = Date.now() / 1000;
    const delta = now - this.lastFrameTime!;
    this.lastFrameTime = now;

    // Update the MVP matrix to adjust for canvas size changes
    this.resize();

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Apply the animation state based on the delta time.
    const skeleton = this.skeletons[this.activeSkeleton][this.format].skeleton;
    const state = this.skeletons[this.activeSkeleton][this.format].state;
    const bounds = this.skeletons[this.activeSkeleton][this.format].bounds;
    const premultipliedAlpha = this.skeletons[this.activeSkeleton][this.format].premultipliedAlpha;
    state.update(delta);
    state.apply(skeleton);
    skeleton.updateWorldTransform();

    // Bind the shader and set the texture and model-view-projection matrix.
    this.shader!.bind();
    this.shader!.setUniformi(spine.Shader.SAMPLER, 0);
    this.shader!.setUniform4x4f(spine.Shader.MVP_MATRIX, this.mvp.values);

    // Start the batch and tell the SkeletonRenderer to render the active skeleton.
    this.batcher!.begin(this.shader!);

    this.skeletonRenderer!.premultipliedAlpha = premultipliedAlpha;
    this.skeletonRenderer!.draw(this.batcher!, skeleton);
    this.batcher!.end();

    this.shader!.unbind();

    // Draw debug information.
    const debug = (document.getElementById('#debug') as HTMLInputElement)?.checked;
    if (debug) {
      this.debugShader!.bind();
      this.debugShader!.setUniform4x4f(spine.Shader.MVP_MATRIX, this.mvp.values);
      this.debugRenderer!.premultipliedAlpha = premultipliedAlpha;
      this.shapes!.begin(this.debugShader!);
      this.debugRenderer!.draw(this.shapes!, skeleton);
      this.shapes!.end();
      this.debugShader!.unbind();
    }

    requestAnimationFrame(this.render.bind(this));
  }

  protected resize() {
    const w = this.canvas!.clientWidth;
    const h = this.canvas!.clientHeight;
    if (this.canvas!.width != w || this.canvas!.height != h) {
      this.canvas!.width = w;
      this.canvas!.height = h;
    }

    // Calculations to center the skeleton in the this.canvas!.
    const bounds = this.skeletons[this.activeSkeleton][this.format].bounds;
    const centerX = bounds.offset.x + bounds.size.x / 2;
    const centerY = bounds.offset.y + bounds.size.y / 2;
    const scaleX = bounds.size.x / this.canvas!.width;
    const scaleY = bounds.size.y / this.canvas!.height;
    let scale = Math.max(scaleX, scaleY) * 2;
    if (scale < 1) scale = 1;
    const width = this.canvas!.width * scale;
    const height = this.canvas!.height * scale;

    this.mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height);
    this.ctx!.gl.viewport(0, 0, this.canvas!.width, this.canvas!.height);
  }
}

export interface SpineRes {
  name: string;
  binary: string;
  json: string;
  texture: string;
}
