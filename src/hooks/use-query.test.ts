import { renderHook } from '@testing-library/react';
import { useQuery } from './use-query';

// Mock react-use
jest.mock('react-use', () => ({
  useLocation: jest.fn(() => ({
    search: '?foo=bar&baz=qux',
  })),
}));

describe('useQuery', () => {
  test('Returns URLSearchParams from search string', () => {
    const { result } = renderHook(() => useQuery());

    expect(result.current).toBeInstanceOf(URLSearchParams);
    expect(result.current.get('foo')).toBe('bar');
    expect(result.current.get('baz')).toBe('qux');
  });

  test('Handles empty search string', () => {
    const { useLocation } = require('react-use');
    useLocation.mockReturnValueOnce({ search: '' });

    const { result } = renderHook(() => useQuery());

    expect(result.current).toBeInstanceOf(URLSearchParams);
    expect(result.current.get('foo')).toBeNull();
  });
});

