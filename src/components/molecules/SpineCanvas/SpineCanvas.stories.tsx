import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpineCanvas from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Test/spine-webgl',
  component: SpineCanvas,
} as ComponentMeta<typeof SpineCanvas>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SpineCanvas> = (args) => <SpineCanvas {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  res: [
    {
      name: 'spineboy',
      binary: 'spine/spineboy-pro.skel',
      json: 'spine/spineboy-pro.json',
      texture: 'spine/spineboy-pma.atlas',
    },
  ],
};
