import { render, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Canvas.stories';
import Canvas from './index';
import { vi } from 'vitest';

const { Primary } = composeStories(stories);
// const { Primary, Secondary, Large, Small } = composeStories(stories);

it('should contain a canvas', async () => {
  const { container } = render(<Primary />);
  await expect(container.querySelector('canvas')).toBeInTheDocument();
});

it('should call the init function', async () => {
  const spy = vi.fn();
  const { container } = render(<Canvas init={spy} />);
  expect(spy).toHaveBeenCalled();
});
