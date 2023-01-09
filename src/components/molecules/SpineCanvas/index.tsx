import Canvas from '@/components/atoms/Canvas';
import SpineController, { SpineRes } from '@/utils/spine/SpineController';
import React, { useRef } from 'react';

export interface SpineCanvasProps {
  /**
   * array of spine resource files
   */
  res: SpineRes[];
}

const SpineCanvas: React.FC<SpineCanvasProps> = (props) => {
  const controller = useRef(new SpineController());
  const init = (canvas: HTMLCanvasElement) => {
    controller.current.init(canvas, props.res);
  };
  return <Canvas className="absolube w-screen h-screen" init={init} />;
};

export default SpineCanvas;
