import Doc from '../views/Doc';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { vi, beforeEach } from 'vitest';
import { act } from 'react';

const testDoc = {
    _id: 101,
    type: "text",
    title: "test",
    content: "hello world",
    owners: [{ email: "banan@gmail.com" }]
};

const testComments = [
    {
        _id: 111,
        selection: 1,
        owner: { email: "test@gmail.com" },
        content: "a test comment"
    },
    {
        _id: 222,
        selection: 1,
        owner: { email: "test@gmail.com" },
        content: "some other text"
    },
    {
        _id: 333,
        selection: 1,
        owner: { email: "test@gmail.com" },
        content: "miscellaneous content"
    }
];


describe('Doc', () => {
    beforeEach(async() => {
        vi.mock(import('../views/models/docs.jsx'), async() => {
            return {
                default: {
                    getOneDoc() {
                        return testDoc;
                    },
                    documentComments() {
                        return testComments;
                    }
                },
                variable: 'mock',
            }
        });

        
        await act( async() => {
            render(
                <MemoryRouter initialEntries={['/lucid-frontend/101']}>
                    <Doc />
                </MemoryRouter>
            );
        });
        
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('DOM', () => {
        test('Testing if renders heading', async () => {

            const h2Element = screen.getByRole('heading', { level: 2 });
            
            expect(h2Element).toBeInTheDocument();
            expect(h2Element).toHaveTextContent('Dokument');
        });

        test('Testing if component renders right labels', () => {
            const label1Element = screen.getByText('Id');
            const label2Element = screen.getByText('Titel');
            const label3Element = screen.getByText('Innehåll');

            expect(label1Element).toBeInTheDocument();
            expect(label2Element).toBeInTheDocument();
            expect(label3Element).toBeInTheDocument();
        });

        test('Testing if form have all the buttons', () => {

            expect(screen.getByRole('button', { name: 'Skapa' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Uppdatera' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Radera' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Comment' })).toBeInTheDocument();
        });

        test('Testing if editor switch is rendered', () => {
            expect(screen.getByText('Text Editor')).toBeInTheDocument();
            expect(screen.getByText('Code Editor')).toBeInTheDocument();
            expect(screen.getByRole('checkbox', { id: 'changeEditor' })).toBeInTheDocument();
        });
    });

    describe('Data', () => {
        test('Testing that correct data is rendered', async() => {
            await waitFor(() => {
                expect(screen.getByDisplayValue(testDoc.title)).toBeInTheDocument();
                const contents = screen.getAllByText(testDoc.content);
                expect(contents[0]).toBeInTheDocument();
            })
        });

        test('Testing that comments are rendered', async () => {
            await waitFor(() => {
                // All comments are rendered
                expect(screen.getAllByRole('button', { name: /delete/i})).toHaveLength(testComments.length);
                expect(screen.getAllByText(testComments[0].owner.email)).toHaveLength(3);
                // Right data is rendered
                expect(screen.getByText(testComments[0].content)).toBeInTheDocument();
                expect(screen.getByText(testComments[1].content)).toBeInTheDocument();
                expect(screen.getByText(testComments[2].content)).toBeInTheDocument();
            });
        });
    });


    describe('Editor', () => {
        test('Test that user can switch between editors', async () => {
            expect(screen.getAllByRole('textbox')).toHaveLength(3);
            await userEvent.click(document.querySelector('#changeEditor'));
            await waitFor(() => {
                expect(screen.getAllByRole('textbox')).toHaveLength(1);
            })
        })
    });
});
