import Doc from '../views/Doc';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from "react-router-dom";


describe('Doc', () => {
    test('Testing if renders heading', () => {
        //Need to render component with som type of router.
        render(
            <MemoryRouter>
                <Doc />
            </MemoryRouter>
        );
        
        const h2Element = screen.getByRole('heading', { level: 2 });
        
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('Dokument');
    });

    test('Testing if component renders right labels', () => {
        //Need to render component with som type of router.
        render(
            <MemoryRouter>
                <Doc />
            </MemoryRouter>
        );
        
        const label1Element = screen.getByText('Id');
        const label2Element = screen.getByText('Titel');
        const label3Element = screen.getByText('Innehåll');

        expect(label1Element).toBeInTheDocument();
        expect(label2Element).toBeInTheDocument();
        expect(label3Element).toBeInTheDocument();
    });

    test('Testing if form have all the buttons', () => {
        render(
            <MemoryRouter>
                <Doc />
            </MemoryRouter>
        );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    expect(screen.getByRole('button', { name: 'Skapa' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Uppdatera' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Radera' })).toBeInTheDocument();
    });
});
