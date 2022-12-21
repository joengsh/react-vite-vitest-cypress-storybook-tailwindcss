import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
    expect(screen.queryByTestId('app')).toBeInTheDocument();
  });
});
