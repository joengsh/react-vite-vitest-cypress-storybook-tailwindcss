import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PixiSpineStage from './index';
import { Spine } from 'pixi-spine';
import * as PIXI from 'pixi.js';

export default {
  title: 'test/PixiSpineStage',
  component: PixiSpineStage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    snapshotTest: 'disable',
  },
} as ComponentMeta<typeof PixiSpineStage>;

const Template: ComponentStory<typeof PixiSpineStage> = (args) => <PixiSpineStage {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  options: { width: 600, height: 400, transparent: true },
  src: 'spine/spineboy.json',
  x: 200,
  y: 300,
  scale: 0.4,
  onMount: (instance: Spine) => {
    if (instance.state.hasAnimation('run')) {
      // run forever, little boy!
      instance.state.setAnimation(0, 'run', true);
      // dont run too fast
      instance.state.timeScale = 0.2;
    }
    const text = new PIXI.Text('This is a PixiJS text', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center',
    });
    // const frontFistSlot = instance.slotContainers[instance.skeleton.findSlotIndex('front-fist')];
    const frontFistSlot = instance.skeleton.findSlot('front-fist').currentSprite;
    frontFistSlot.addChild(text);
    console.log(frontFistSlot);

    // to remove or change the original slot image
    // instance.hackTextureBySlotName('front-fist', PIXI.Texture.EMPTY);
    frontFistSlot.texture = PIXI.Texture.EMPTY;
  },
};
