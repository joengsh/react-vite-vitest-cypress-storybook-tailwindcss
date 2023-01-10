import { Stage, StagePropsWithOptions } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import PixiSpine from '@/components/atoms/PixiSpine';
import { Spine } from 'pixi-spine';

export type _PixiSpineStageProps = {
  /**
   * spine json src
   */
  src: string;
  /**
   * Init function after component mount
   * @param spine
   * @returns
   */
  onMount?: (spine: Spine) => void;
  x?: number;
  y?: number;
  scale?: number;
  visible?: boolean;
};
export type PixiSpineStageProps = _PixiSpineStageProps & StagePropsWithOptions;

const PixiSpineStage: React.FC<PixiSpineStageProps> = ({
  src,
  onMount,
  x,
  y,
  scale,
  visible = true,
  ...props
}) => {
  const [spineData, setSpineData] = useState(null);
  const spineRef = useRef<Spine>(null);

  useEffect(() => {
    function onAssetsLoaded() {
      setSpineData(PIXI.Loader.shared.resources['spineCharacter'].spineData);
    }

    if (!PIXI.Loader.shared.resources['spineCharacter']) {
      PIXI.Loader.shared
        .add('spineCharacter', src, {
          crossOrigin: 'anonymous',
          // metadata: { spineSkeletonScale: scale },
        })
        .load(onAssetsLoaded);
    } else {
      onAssetsLoaded();
    }
  }, []);

  if (!spineData) return <div>Loading...</div>;

  return (
    <>
      <Stage data-testid="spine-stage-with-snap" {...props}>
        <PixiSpine
          ref={spineRef}
          x={x}
          y={y}
          scale={scale}
          visible={visible}
          spineData={spineData}
          onMount={onMount}
        />
      </Stage>
    </>
  );
};

export default PixiSpineStage;
