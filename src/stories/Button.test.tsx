import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Button.stories';

const allStories = composeStories(stories);
describe('Button', () => {
  Object.values(allStories).forEach((Story) => {
    it('should match snapshot', () => {
      const { container } = render(<Story />);
      expect(container).toMatchSnapshot();
    });
  });
});

// should also include click test, property test including primary, size, backgroundColor, label, etc
