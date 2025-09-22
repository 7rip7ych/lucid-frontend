import Doc from '../views/Doc';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';


describe('Doc', () => {
    test('Testing if renders heading', () => {
        render(<Doc />);
        
        const h2Element = screen.getByRole('heading', { level: 2 });
        
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('Dokument');
    });

    // test('Testing if form have buttons', () => {
    // render(<Doc />);
    
    // const labelElement = screen.getByRole('heading', { level: 2 });
    
    // expect(h2Element).toBeInTheDocument();
    // expect(h2Element).toHaveTextContent('Dokument');
    // });
});
