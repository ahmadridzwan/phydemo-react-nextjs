import { render, screen, act } from '@testing-library/react';
import Loading from '../Loading';

jest.useFakeTimers();

describe('Loading Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading component', () => {
    render(<Loading />);
    const videoElement = screen.getByTestId('loading-video');
    expect(videoElement).toBeInTheDocument();
    const src = videoElement.getAttribute('src');
    expect(decodeURIComponent(src || '')).toContain('/assets/pulse.gif');
  });

  it('disappears after 3 seconds', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading-video')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId('loading-video')).not.toBeInTheDocument();
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<Loading />);
    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });
});
