import Index from '../views/Index';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const testDocs = [
    {
        _id: 101,
        type: "text",
        title: "test title",
        content: "hello world",
        owners: [{ email: "banan@gmail.com" }]
    },
    {
        _id: 10101,
        type: "text",
        title: "another title",
        content: "hello world",
        owners: [{ email: "banan@gmail.com" }]
    }
]

describe('Index', () => {
    test('renders Index', () => {
        render(
            <MemoryRouter>
                <Index />
            </MemoryRouter>
        );
        
        const h2Element = screen.getByRole('heading', { level: 2 });
        
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('dokument');
    });

    test('renders documents', async () => {
        vi.mock(import('../views/models/docs.jsx'), async() => {
            return {
                default: {
                    allDocuments() {
                        return testDocs;
                    }
                },
                variable: 'mock',
            }
        });
    
        render(
            <MemoryRouter>
                <Index />
            </MemoryRouter>
        );

        waitFor(() => {
            expect(screen.getByText(testDocs[0].title)).toBeInTheDocument();
            expect(screen.getByText(testDocs[1].title)).toBeInTheDocument();
        });

        vi.resetAllMocks();
    });
});