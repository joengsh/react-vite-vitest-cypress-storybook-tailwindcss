// vitest.setup.ts
import { afterAll, vi } from 'vitest';
// eslint-disable-next-line import/first
import 'jest-webgl-canvas-mock';
import getCanvasWindow from 'jest-webgl-canvas-mock/lib/window';
// @ts-expect-error: Global type missing
global.jest = vi;

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
  'Image',
  'HTMLImageElement',
  'HTMLVideoElement',
  'WebGLRenderingContext',
  'WebGLActiveInfo',
  'WebGLBuffer',
  'WebGLContextEvent',
  'WebGLFramebuffer',
  'WebGLProgram',
  'WebGLQuery',
  'WebGLRenderbuffer',
  'WebGLShader',
  'WebGLShaderPrecisionFormat',
  'WebGLTexture',
  'WebGLUniformLocation',
];

HTMLCanvasElement.prototype.getContext = vi.fn();

const canvasWindow = getCanvasWindow({ document: window.document });

apis.forEach((api) => {
  // @ts-expect-error: Global type missing
  global[api] = canvasWindow[api];
  // @ts-expect-error: Global type missing
  global.window[api] = canvasWindow[api];
});

afterAll(() => {
  // @ts-expect-error: type
  delete global.jest;
  // @ts-expect-error: type
  delete global.window.jest;
});
