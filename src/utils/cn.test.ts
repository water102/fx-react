import { cn } from './cn';

describe('cn', () => {
  test('Merges class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  test('Handles conditional classes', () => {
    const result = cn('foo', false && 'bar', 'baz');
    expect(result).toBe('foo baz');
  });

  test('Merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  test('Handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });
});

