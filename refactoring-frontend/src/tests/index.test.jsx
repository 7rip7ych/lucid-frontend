import React from 'react';
import Index from '../views/index';
import { render, screen } from '@testing-library/react';
import { describe, test, vi, expect } from 'vitest';

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
        json: () => Promise.resolve([{ _id: "1", title: "Test Doc" }]),
        })
    );
});

describe('Index', () => {
    test('renders Index', () => {
        render(<Index />);
        
        const h2Element = screen.getByRole('heading', { level: 2 });
        
        expect(h2Element).toBeInTheDocument();
        expect(h2Element).toHaveTextContent('Dokument');
    });
});