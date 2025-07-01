// types/calculator.ts
export interface CalculatorState {
  display: string
  previousValue: number | null
  operation: string | null
  waitingForNumber: boolean
  history: string[]
}

export type CalculatorOperation = '+' | '-' | '*' | '/' | '='

export interface CalculatorButton {
  label: string
  value: string
  type: 'number' | 'operation' | 'function' | 'equals'
  className?: string
}