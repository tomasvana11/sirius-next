// components/Calculator/Calculator.types.ts

export interface CalculatorProps {
    className?: string;
  }
  
  export interface CalculatorState {
    initialInvestment: number;
    monthlyInvestment: number;
    investmentYears: number;
  }
  
  export interface ChartDataPoint {
    year: string;
    savings: number;
    appreciation: number;
    total: number;
  }