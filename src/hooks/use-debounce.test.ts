import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Debounces function calls', () => {
    const func = jest.fn();
    const { result } = renderHook(() => useDebounce(func, 500, []));

    act(() => {
      result.current('arg1');
      result.current('arg2');
      result.current('arg3');
    });

    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('arg3');
  });

  test('Recreates debounced function when dependencies change', () => {
    const func = jest.fn();
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounce(func, delay, [delay]),
      { initialProps: { delay: 500 } }
    );

    act(() => {
      result.current('test');
      jest.advanceTimersByTime(500);
    });

    // First call should have executed
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test');

    // Clear mock and rerender with new delay
    func.mockClear();
    rerender({ delay: 1000 });

    act(() => {
      result.current('test2');
      jest.advanceTimersByTime(500);
    });

    // Should not be called yet with new delay
    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now should be called
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test2');
  });
});

