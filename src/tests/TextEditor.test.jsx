import TextEditor from '../views/components/TextEditor';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from "react-router-dom";

const testDoc = {
    id: 101,
    type: "text",
    title: "test",
    content: "hello world"
};

describe('Text Editor', () => {
    test('Test if component renders DOM', () => {
        render(
            <MemoryRouter>
                <TextEditor data={ testDoc } />
            </MemoryRouter>
        );
        
        expect(screen.getAllByRole('textbox')).toHaveLength(3);
        expect(screen.getAllByRole('button', { type: "submit" })).toHaveLength(3);
    });

    test('Test if render correct data', () => {
        render(
            <MemoryRouter>
                <TextEditor data={ testDoc } />
            </MemoryRouter>
        );
        
        expect(screen.getByDisplayValue(testDoc.id)).toBeInTheDocument();
        expect(screen.getByDisplayValue(testDoc.title)).toBeInTheDocument();
        expect(screen.getByText(testDoc.content)).toBeInTheDocument();
    });
});