import TextEditor from '../views/components/TextEditor';
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

describe('Text Editor', () => {
    beforeEach(async() => {
        await act( async() => {
            render(
                <MemoryRouter>
                    <TextEditor data={ testDoc } comments={ testComments } />
                </MemoryRouter>
            );
        });
    });
    
    test('Test if component renders DOM', () => {
        expect(screen.getAllByRole('textbox')).toHaveLength(3);
        expect(screen.getAllByRole('button', { type: "submit" })).toHaveLength(3);
    });

    test('Test if render correct data', () => {
        expect(screen.getByDisplayValue(testDoc.id)).toBeInTheDocument();
        expect(screen.getByDisplayValue(testDoc.title)).toBeInTheDocument();
        expect(screen.getAllByText(/^line 1.*multiline string/)).toHaveLength(1);
    });

    
    test('Testing if comments render', () => {
        const highlight1 = screen.getByText('line 1: hello world');
        const highlight2 = screen.getByText('line 2: this is a');
        const highlight3 = screen.getByText('line 3: multiline string');

        expect(highlight1).toBeInTheDocument();
        expect(highlight2).toBeInTheDocument();
        expect(highlight3).toBeInTheDocument();

        expect(highlight1.getAttribute("data-id")).toBe(testComments[0]._id.toString());
        expect(highlight2.getAttribute("data-id")).toBe(testComments[1]._id.toString());
        expect(highlight3.getAttribute("data-id")).toBe(testComments[2]._id.toString());
    });
    
});