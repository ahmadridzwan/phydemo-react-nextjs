import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from '../UserCard';
import { User } from '@/types/user';

// Mock next/image since it's not supported in jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const imgProps = {
      ...props,
      fill: props.fill ? 'true' : undefined,
    };
    return <img {...imgProps} />;
  },
}));

const mockUser: User = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  avatar: '/path/to/avatar.jpg',
};

describe('UserCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe('Desktop version', () => {
    it('renders user information correctly', () => {
      render(
        <UserCard user={mockUser} isMobile={false} onClick={mockOnClick} />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByAltText('John Doe')).toHaveAttribute(
        'src',
        '/path/to/avatar.jpg'
      );
    });

    it('calls onClick when clicked', () => {
      render(
        <UserCard user={mockUser} isMobile={false} onClick={mockOnClick} />
      );

      fireEvent.click(screen.getByText('John Doe').parentElement!);
      expect(mockOnClick).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('Mobile version', () => {
    it('renders user information correctly', () => {
      render(
        <UserCard user={mockUser} isMobile={true} onClick={mockOnClick} />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByAltText('John Doe')).toHaveAttribute(
        'src',
        '/path/to/avatar.jpg'
      );
    });

    it('has different styling for mobile layout', () => {
      render(
        <UserCard user={mockUser} isMobile={true} onClick={mockOnClick} />
      );

      const container = screen.getByRole('img').closest('div')?.parentElement;
      expect(container).toHaveClass(
        'py-6 px-4 bg-white border-b border-gray-200 flex items-center'
      );
    });

    it('calls onClick when clicked', () => {
      render(
        <UserCard user={mockUser} isMobile={true} onClick={mockOnClick} />
      );

      fireEvent.click(
        screen.getByText('John Doe').parentElement!.parentElement!
      );
      expect(mockOnClick).toHaveBeenCalledWith(mockUser);
    });
  });
});
