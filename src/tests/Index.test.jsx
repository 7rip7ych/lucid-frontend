import React from 'react';
import Index from '../views/Index';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Index', () => {
    test('renders Index', () => {
        render(
            <MemoryRouter>
                <Index />
            </MemoryRouter>
        );
        
        const h2Element = screen.getByRole('heading', { level: 2 });
        
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('Dokument');
    });
});