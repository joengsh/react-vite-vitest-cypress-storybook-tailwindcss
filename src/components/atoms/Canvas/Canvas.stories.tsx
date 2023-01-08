import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Canvas from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Test/Canvas',
  component: Canvas,
} as ComponentMeta<typeof Canvas>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Canvas> = (args) => <Canvas {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  init: (canvas) => {
    const context = canvas.getContext('2d')!;
    //Our first draw
    context.fillStyle = '#ff0000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  },
};
