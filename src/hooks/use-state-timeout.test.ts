import { renderHook, act } from '@testing-library/react';
import { useStateTimeout } from './use-state-timeout';

describe('useStateTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('Returns initial value', () => {
    const { result } = renderHook(() => useStateTimeout('initial', 1000));
    expect(result.current[0]).toBe('initial');
  });

  test('Sets new value immediately', () => {
    const { result } = renderHook(() => useStateTimeout('initial', 1000));
    
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
  });

  test('Reverts to previous value after timeout', () => {
    const { result } = renderHook(() => useStateTimeout('initial', 1000));
    
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe('initial');
  });

  test('Clears previous timeout when setting new value', () => {
    const { result } = renderHook(() => useStateTimeout('initial', 1000));
    
    act(() => {
      result.current[1]('value1');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      result.current[1]('value2');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should still be 'value2' because timeout was cleared and new timeout set
    expect(result.current[0]).toBe('value2');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now should revert to 'value1' (previous value before value2, not initial)
    expect(result.current[0]).toBe('value1');
  });

  test('setState works independently', () => {
    const { result } = renderHook(() => useStateTimeout('initial', 1000));
    
    act(() => {
      result.current[2]('permanent');
    });

    expect(result.current[0]).toBe('permanent');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // setState should not be affected by timeout
    expect(result.current[0]).toBe('permanent');
  });
});

