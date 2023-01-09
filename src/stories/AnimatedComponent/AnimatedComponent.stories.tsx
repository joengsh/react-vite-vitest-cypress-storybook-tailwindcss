import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AnimatedComponent from './index';

export default {
  title: 'Test/AnimatedComponent',
  component: AnimatedComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    snapshotTest: 'disable',
  },
} as ComponentMeta<typeof AnimatedComponent>;

const Template: ComponentStory<typeof AnimatedComponent> = (args) => <AnimatedComponent />;

export const Example = Template.bind({});
