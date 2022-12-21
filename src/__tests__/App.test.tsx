import { render, screen } from '@testing-library/react';
import App from '@/App';
import Footer from '@/components/Footer/Footer';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
    expect(screen.queryByTestId('app')).toBeInTheDocument();
  });

  it('should work as expected 2', () => {
    render(<Footer />);
  });
});
