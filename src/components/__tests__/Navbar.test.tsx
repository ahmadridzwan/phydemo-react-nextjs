import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders the title correctly', () => {
    render(<Navbar title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('does not show back button by default', () => {
    render(<Navbar title="Test Title" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows back button when showBack is true', () => {
    render(<Navbar title="Test Title" showBack />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const mockOnBack = jest.fn();
    render(<Navbar title="Test Title" showBack onBack={mockOnBack} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
