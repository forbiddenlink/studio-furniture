import { expect, test } from 'vitest';
import { cn } from './utils';

test('cn merges class names correctly', () => {
    expect(cn('w-full', 'h-full')).toBe('w-full h-full');
    expect(cn('p-2', 'p-4')).toBe('p-4'); // tailwind-merge should resolve this
    expect(cn('text-red-500', null, undefined, false && 'text-blue-500')).toBe('text-red-500');
});
