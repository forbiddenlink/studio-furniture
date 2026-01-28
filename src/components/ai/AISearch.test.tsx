import { expect, test, vi, describe, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { AISearch } from './AISearch';

// Mock Product type isn't needed as we mock the response data

const onResults = vi.fn();

describe('AISearch Component', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        onResults.mockClear();
        cleanup(); // Explicit cleanup
    });

    test('renders correctly', () => {
        render(<AISearch onResults={onResults} />);
        expect(screen.getByTestId('ai-search-input')).toBeInTheDocument();
        expect(screen.getByText('AI Search')).toBeInTheDocument();
    });

    test('calls API on search and returns results', async () => {
        const mockResults = [{ id: '1', name: 'Test Chair' }];
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ results: mockResults }),
        } as Response);

        render(<AISearch onResults={onResults} />);

        const input = screen.getAllByTestId('ai-search-input')[0];
        fireEvent.change(input, { target: { value: 'Chair' } });

        const button = screen.getAllByText('AI Search')[0];
        fireEvent.click(button);

        expect(screen.getByText(/Searching/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/ai/search', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ query: 'Chair' }),
            }));
            expect(onResults).toHaveBeenCalledWith(mockResults);
        });
    });
});
