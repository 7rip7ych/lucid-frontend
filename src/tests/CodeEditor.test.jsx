import CodeEditor from '../views/components/CodeEditor';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from "react-router-dom";

const testDoc = {
    id: 101,
    type: "text",
    title: "test",
    content: "hello world"
};

describe('Code Editor', () => {
    test('Test if component renders DOM', () => {
        render(
            <MemoryRouter>
                <CodeEditor data={ testDoc } />
            </MemoryRouter>
        );
        
        expect(screen.getAllByRole('textbox')).toHaveLength(1);
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Execute')).toBeInTheDocument();
    });

    test('Test if render correct data', () => {
        render(
            <MemoryRouter>
                <CodeEditor data={ testDoc } />
            </MemoryRouter>
        );

        expect(screen.getByDisplayValue(testDoc.title)).toBeInTheDocument();
    });
});