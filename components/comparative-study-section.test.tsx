import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import ComparativeStudySection from './comparative-study-section';

describe('ComparativeStudySection', () => {
  it('renders loading state initially', () => {
    render(<ComparativeStudySection />);
    expect(screen.getByText(/Henter sammenlignende studie.../i)).toBeInTheDocument();
  });

  // Flere tests kan tilføjes her for at dække:
  // - Visning af data efter succesfuld hentning
  // - Visning af fejlmeddelelse ved fejl
  // - Korrekt rendering af UI-elementer (Card, Skeleton osv.)
});