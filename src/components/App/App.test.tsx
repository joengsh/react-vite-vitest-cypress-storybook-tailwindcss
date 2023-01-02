import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@components/App/App';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
    expect(screen.queryByTestId('app')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
