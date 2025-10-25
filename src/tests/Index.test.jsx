import Index from '../views/Index';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

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
    beforeEach(async() => {
        vi.mock(import('../views/models/users.jsx'), async() => {
            return {
                default: {
                    usersDocuments() {
                        return testDocs;
                    }
                },
                variable: 'mock',
            }
        });
    
        await act(async() => {
            render(
                <MemoryRouter>
                    <Index />
                </MemoryRouter>
            );
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    })
    test('renders Index', async() => {
        const h2Element = await screen.getByRole('heading', { level: 2 });
        
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('dokument');
    });

    test('renders documents', async () => {
        waitFor(() => {
            expect(screen.getByText(testDocs[0].title)).toBeInTheDocument();
            expect(screen.getByText(testDocs[1].title)).toBeInTheDocument();
        });
    });
});