import { renderHook } from '@testing-library/react';
import { useInterval } from './use-interval';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Calls function at specified interval', () => {
    const func = jest.fn();
    renderHook(() => useInterval(func, 1000));

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
  });

  test('Clears interval on unmount', () => {
    const func = jest.fn();
    const { unmount } = renderHook(() => useInterval(func, 1000));

    jest.advanceTimersByTime(500);
    unmount();
    jest.advanceTimersByTime(1000);

    expect(func).not.toHaveBeenCalled();
  });

  test('Restarts interval when dependencies change', () => {
    const func = jest.fn();
    const { rerender } = renderHook(
      ({ interval }) => useInterval(func, interval),
      { initialProps: { interval: 1000 } }
    );

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);

    rerender({ interval: 500 });
    jest.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

