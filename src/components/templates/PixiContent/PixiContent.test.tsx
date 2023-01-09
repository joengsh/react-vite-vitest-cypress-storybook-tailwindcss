import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PixiTest from '@components/templates/PixiContent';

const mockSetState = vi.fn();

describe('App', () => {
  beforeAll(() => {
    vi.mock('react', () => ({
      useState: (initial: unknown) => [initial, mockSetState],
    }));
  });
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should work as expected', () => {
    const { container } = render(<PixiTest />);
    expect(container.querySelectorAll('canvas').length).toEqual(10);
  });

  test('OnClick should be called', () => {
    const { container } = render(<PixiTest />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    if (button) {
      fireEvent(
        button,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      expect(mockSetState).toHaveBeenCalledTimes(2);
    }
  });
});
