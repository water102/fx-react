import { renderHook } from '@testing-library/react';
import { useWindowDimensions } from './use-window-dimensions';

// Mock dependencies - define mocks inside factories to avoid hoisting issues
jest.mock('@water102/fx-web', () => {
  const mockGetWindowDimensions = jest.fn(() => ({ width: 1024, height: 768 }));
  return {
    getWindowDimensions: mockGetWindowDimensions,
    __mockGetWindowDimensions: mockGetWindowDimensions,
  };
});

jest.mock('./use-event', () => {
  const mockUseEvent = jest.fn(() => jest.fn());
  return {
    useEvent: mockUseEvent,
    __mockUseEvent: mockUseEvent,
  };
});

describe('useWindowDimensions', () => {
  const getMockGetWindowDimensions = () => {
    const fxWeb = require('@water102/fx-web');
    return fxWeb.__mockGetWindowDimensions;
  };

  const getMockUseEvent = () => {
    const useEventModule = require('./use-event');
    return useEventModule.__mockUseEvent;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const mock = getMockGetWindowDimensions();
    mock.mockReturnValue({ width: 1024, height: 768 });
  });

  test('Returns initial window dimensions', () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current).toEqual({ width: 0, height: 0 });
  });

  test('Sets up resize event listener', () => {
    renderHook(() => useWindowDimensions());

    const mockUseEvent = getMockUseEvent();
    expect(mockUseEvent).toHaveBeenCalledWith(
      window,
      'resize',
      expect.any(Function),
      []
    );
  });
});

