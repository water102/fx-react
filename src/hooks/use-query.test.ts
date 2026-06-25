import { renderHook } from '@testing-library/react';
import { useQuery, useUrlQuery } from './use-query';

// Mock react-use
jest.mock('react-use', () => ({
  useLocation: jest.fn(() => ({
    search: '?foo=bar&baz=qux',
  })),
}));

describe('useUrlQuery', () => {
  test('Returns URLSearchParams from search string', () => {
    const { result } = renderHook(() => useUrlQuery());

    expect(result.current).toBeInstanceOf(URLSearchParams);
    expect(result.current.get('foo')).toBe('bar');
    expect(result.current.get('baz')).toBe('qux');
  });

  test('Handles empty search string', () => {
    const { useLocation } = require('react-use');
    useLocation.mockReturnValueOnce({ search: '' });

    const { result } = renderHook(() => useUrlQuery());

    expect(result.current).toBeInstanceOf(URLSearchParams);
    expect(result.current.get('foo')).toBeNull();
  });
});

describe('useQuery (deprecated alias)', () => {
  test('matches useUrlQuery', () => {
    const { result: urlResult } = renderHook(() => useUrlQuery());
    const { result: legacyResult } = renderHook(() => useQuery());

    expect(legacyResult.current.toString()).toBe(urlResult.current.toString());
  });
});
