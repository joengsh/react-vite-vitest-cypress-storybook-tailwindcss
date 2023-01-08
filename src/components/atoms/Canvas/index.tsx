/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useEffect, HTMLProps, FC } from 'react';

export interface CanvasProp extends HTMLProps<HTMLCanvasElement> {
  /**
   * init function called after the HTMLCanvasElement mount
   */
  init: (canvas: HTMLCanvasElement) => void;
}

const Canvas: FC<CanvasProp> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    props.init(canvas);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
