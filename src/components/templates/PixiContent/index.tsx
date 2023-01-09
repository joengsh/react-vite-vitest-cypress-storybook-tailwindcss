import { Sprite, Stage } from 'react-pixi-fiber';
import bunny from '@assets/bunny.png';
import * as PIXI from 'pixi.js';
import { useState } from 'react';

function Bunny(props: any) {
  return <Sprite texture={PIXI.Texture.from(bunny)} {...props} />;
}

export const Pixi = ({ width, height }: any) => (
  <Stage options={{ backgroundColor: 0x10bb99, height: height, width: width }}>
    <Bunny x={200} y={200} />
  </Stage>
);

const PixiTest = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const onClick = () => {
    setWidth(Math.ceil(Math.random() * 400) + 400);
    setHeight(Math.ceil(Math.random() * 300) + 300);
  };

  return (
    <>
      <button onClick={onClick}>resize</button>
      {[...Array(10).keys()].map((i) => {
        return <Pixi key={i} width={width} height={height} />;
      })}
    </>
  );
};

export default PixiTest;
