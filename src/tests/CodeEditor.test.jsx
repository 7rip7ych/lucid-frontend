import CodeEditor from '../views/components/CodeEditor';
import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from "react-router-dom";

const testDoc = {
    id: 101,
    type: "text",
    title: "test",
    content: `line 1: hello world\nline 2: this is a\nline 3: multiline string`,
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
        selection: 2,
        owner: { email: "test@gmail.com" },
        content: "some other text"
    },
    {
        _id: 333,
        selection: 3,
        owner: { email: "test@gmail.com" },
        content: "miscellaneous content"
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

    test('Test if render correct data', () => {
        expect(screen.getByDisplayValue(testDoc.title)).toBeInTheDocument();
    });
});