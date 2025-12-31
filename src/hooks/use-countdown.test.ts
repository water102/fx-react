import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './use-countdown';

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Starts with startNumber', () => {
    const { result } = renderHook(() =>
      useCountdown({
        startNumber: 10,
        diffNumber: 1,
        waitingTime: 1000,
        endNumber: 0,
      })
    );

    expect(result.current[0]).toBe(10);
  });

  test('Counts down at specified interval', () => {
    const { result } = renderHook(() =>
      useCountdown({
        startNumber: 5,
        diffNumber: 1,
        waitingTime: 1000,
        endNumber: 0,
      })
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(4);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(3);
  });

  test('Stops at endNumber', () => {
    const { result } = renderHook(() =>
      useCountdown({
        startNumber: 3,
        diffNumber: 1,
        waitingTime: 1000,
        endNumber: 0,
      })
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current[0]).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should still be 0, not negative
    expect(result.current[0]).toBe(0);
  });

  test('Updates when config changes', () => {
    const { result } = renderHook(
      ({ config }) => useCountdown(config),
      {
        initialProps: {
          config: {
            startNumber: 5,
            diffNumber: 1,
            waitingTime: 1000,
            endNumber: 0,
          },
        },
      }
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(4);

    // Update config - this should reset the countdown
    act(() => {
      result.current[1]({
        startNumber: 10,
        diffNumber: 2,
        waitingTime: 500,
        endNumber: 0,
      });
    });

    // Should reset to new startNumber
    expect(result.current[0]).toBe(10);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe(8);
  });
});

