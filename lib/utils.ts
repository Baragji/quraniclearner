import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// cn function - standard fra shadcn/ui
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funktion til at beregne procentdel
export const calculatePercentage = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};

// Her kan du tilføje flere genbrugelige funktioner i fremtiden