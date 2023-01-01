import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Button.stories';

const allStories = composeStories(stories);
// const { Primary, Secondary, Large, Small } = composeStories(stories);

Object.values(allStories).forEach((Story) => {
  it('renders in the loading state', () => {
    const { container } = render(<Story />);
    expect(container.getElementsByClassName('storybook-button').length).toBe(1);
  });
});
