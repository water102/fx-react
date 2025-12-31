import { renderHook } from '@testing-library/react';
import { useEvent } from './use-event';

// Mock fx-web - define mock inside factory to avoid hoisting issues
jest.mock('@water102/fx-web', () => {
  const mockListenEvent = jest.fn(() => jest.fn());
  return {
    listenEvent: mockListenEvent,
    __mockListenEvent: mockListenEvent,
  };
});

describe('useEvent', () => {
  const getMockListenEvent = () => {
    const fxWeb = require('@water102/fx-web');
    return fxWeb.__mockListenEvent;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const mock = getMockListenEvent();
    mock.mockReturnValue(jest.fn());
  });

  test('Calls listenEvent on mount', () => {
    const listener = jest.fn();
    renderHook(() => useEvent(window, 'resize', listener, []));

    const mock = getMockListenEvent();
    expect(mock).toHaveBeenCalled();
  });

  test('Returns cleanup function', () => {
    const cleanup = jest.fn();
    const mock = getMockListenEvent();
    mock.mockReturnValue(cleanup);

    const { unmount } = renderHook(() =>
      useEvent(window, 'resize', jest.fn(), [])
    );

    unmount();

    expect(cleanup).toHaveBeenCalled();
  });
});

