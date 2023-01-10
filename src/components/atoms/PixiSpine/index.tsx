// components/Rectangle.js
import { CustomPIXIComponent, DisplayObjectProps } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

export type PixiSpineProps = {
  spineData: any;
  onMount?: (spine: Spine) => void;
};
export type SpineRef = {
  _app: React.RefObject<Spine>;
  props: PixiSpineProps;
};
export type SpineProps = PixiSpineProps & DisplayObjectProps<PIXI.DisplayObject>;

const TYPE = 'Spine';
export const behavior = {
  customDisplayObject: (props: SpineProps) => new Spine(props.spineData),
  customApplyProps: function (
    instance: Spine,
    oldProps: SpineProps | undefined,
    newProps: SpineProps
  ) {
    const { onMount, x, y, visible, scale } = newProps;
    instance._onMount = onMount;
    instance.x = x;
    instance.y = y;
    instance.visible = visible;

    const root = instance.skeleton.findBone('root');
    if (root.scaleX !== scale) {
      root.scaleX = scale;
      root.scaleY = scale;
    }
  },
  customDidAttach: (instance: Spine) => {
    instance._onMount && instance._onMount(instance);
  },
  customWillDetach: (instance: Spine) => {
    instance._onMount = null;
  },
};
export default CustomPIXIComponent(behavior, TYPE);
