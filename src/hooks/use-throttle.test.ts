import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './use-throttle';

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Throttles function calls', () => {
    const func = jest.fn();
    const { result } = renderHook(() => useThrottle(func, 500, []));

    act(() => {
      result.current('arg1');
    });

    // First call schedules execution after cooldown, doesn't execute immediately
    expect(func).not.toHaveBeenCalled();

    act(() => {
      result.current('arg2');
      result.current('arg3');
    });

    // Subsequent calls within throttle period update args but don't schedule new execution
    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // After cooldown, function executes with last args
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('arg3');

    act(() => {
      result.current('arg4');
    });

    // Next call schedules new execution
    expect(func).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenCalledWith('arg4');
  });

  test('Recreates throttled function when dependencies change', () => {
    const func = jest.fn();
    const { result, rerender } = renderHook(
      ({ cooldown }) => useThrottle(func, cooldown, [cooldown]),
      { initialProps: { cooldown: 500 } }
    );

    act(() => {
      result.current('test');
    });

    // First call schedules execution
    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test');

    // Clear and rerender with new cooldown
    func.mockClear();
    rerender({ cooldown: 1000 });

    act(() => {
      result.current('test2');
    });

    // New throttled function schedules execution with new cooldown
    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test2');
  });
});

