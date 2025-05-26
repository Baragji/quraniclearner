import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import ThematicExplorationSection from './thematic-exploration-section';

describe('ThematicExplorationSection', () => {
  it('renders loading state initially', () => {
    render(<ThematicExplorationSection />);
    expect(screen.getByText(/Henter tematisk udforskning.../i)).toBeInTheDocument();
  });

  // Flere tests kan tilføjes her for at dække:
  // - Visning af data efter succesfuld hentning
  // - Visning af fejlmeddelelse ved fejl
  // - Korrekt rendering af UI-elementer (Card, Skeleton osv.)
});