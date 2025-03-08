import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('renders with default message', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The requested resource could not be found.')
    ).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = 'Custom error message';
    render(<NotFound message={customMessage} />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(<NotFound />);

    const container = screen.getByText('404').parentElement?.parentElement;
    expect(container).toHaveClass(
      'min-h-screen',
      'flex',
      'items-center',
      'justify-center'
    );
  });
});
