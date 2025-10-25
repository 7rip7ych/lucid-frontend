import CodeEditor from '../views/components/CodeEditor';
import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from "react-router-dom";

const testDoc = {
    id: 101,
    type: "code",
    title: "test",
    content: "console.log('hello world');",
    owners: [{ email: "banan@gmail.com" }]
};

const testComments = [
    {
        _id: 111,
        selection: 1,
        owner: { email: "test@gmail.com" },
        content: "a test comment"
    }
];

describe('Code Editor', () => {
    beforeEach(async() => {
        await act( async() => {
            render(
                <MemoryRouter>
                    <CodeEditor data={ testDoc } comments={ testComments } />
                </MemoryRouter>
            );
        });
    });

    test('Test if component renders DOM', () => {
        expect(screen.getAllByRole('textbox')).toHaveLength(1);
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Execute')).toBeInTheDocument();
    });

    test('Test if render correct data', async() => {
        expect(screen.getByDisplayValue(testDoc.title)).toBeInTheDocument();
    });
});