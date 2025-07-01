// components/calculator.tsx
"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calculator as CalculatorIcon, RotateCcw, Delete } from "lucide-react"
import type { CalculatorState, CalculatorButton } from "@/types/calculator"

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForNumber: false,
    history: []
  })

  const calculatorButtons: CalculatorButton[] = [
    { label: "C", value: "clear", type: "function", className: "bg-red-500 hover:bg-red-600 text-white" },
    { label: "CE", value: "clearEntry", type: "function", className: "bg-orange-500 hover:bg-orange-600 text-white" },
    { label: "⌫", value: "backspace", type: "function", className: "bg-gray-500 hover:bg-gray-600 text-white" },
    { label: "÷", value: "/", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-white" },
    
    { label: "7", value: "7", type: "number" },
    { label: "8", value: "8", type: "number" },
    { label: "9", value: "9", type: "number" },
    { label: "×", value: "*", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-white" },
    
    { label: "4", value: "4", type: "number" },
    { label: "5", value: "5", type: "number" },
    { label: "6", value: "6", type: "number" },
    { label: "−", value: "-", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-white" },
    
    { label: "1", value: "1", type: "number" },
    { label: "2", value: "2", type: "number" },
    { label: "3", value: "3", type: "number" },
    { label: "+", value: "+", type: "operation", className: "bg-blue-500 hover:bg-blue-600 text-white" },
    
    { label: "±", value: "negate", type: "function", className: "bg-gray-500 hover:bg-gray-600 text-white" },
    { label: "0", value: "0", type: "number" },
    { label: ".", value: ".", type: "number" },
    { label: "=", value: "=", type: "equals", className: "bg-green-500 hover:bg-green-600 text-white" },
  ]

  const addToHistory = useCallback((calculation: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history.slice(-9), calculation] // Manter apenas os últimos 10 cálculos
    }))
  }, [])

  const calculate = useCallback((prev: number, current: number, operation: string): number => {
    switch (operation) {
      case '+': return prev + current
      case '-': return prev - current
      case '*': return prev * current
      case '/': return current !== 0 ? prev / current : prev
      default: return current
    }
  }, [])

  const handleButtonClick = useCallback((button: CalculatorButton) => {
    setState(prev => {
      switch (button.type) {
        case 'number':
          if (button.value === '.') {
            if (prev.display.includes('.')) return prev
            return {
              ...prev,
              display: prev.waitingForNumber ? '0.' : prev.display + '.',
              waitingForNumber: false
            }
          }
          
          const newDisplay = prev.waitingForNumber || prev.display === '0' 
            ? button.value 
            : prev.display + button.value
          
          return {
            ...prev,
            display: newDisplay,
            waitingForNumber: false
          }

        case 'operation':
          const currentValue = parseFloat(prev.display)
          
          if (prev.previousValue !== null && prev.operation && !prev.waitingForNumber) {
            const result = calculate(prev.previousValue, currentValue, prev.operation)
            const calculation = `${prev.previousValue} ${prev.operation} ${currentValue} = ${result}`
            addToHistory(calculation)
            
            return {
              ...prev,
              display: result.toString(),
              previousValue: result,
              operation: button.value,
              waitingForNumber: true
            }
          }
          
          return {
            ...prev,
            previousValue: currentValue,
            operation: button.value,
            waitingForNumber: true
          }

        case 'equals':
          if (prev.previousValue !== null && prev.operation) {
            const currentValue = parseFloat(prev.display)
            const result = calculate(prev.previousValue, currentValue, prev.operation)
            const calculation = `${prev.previousValue} ${prev.operation} ${currentValue} = ${result}`
            addToHistory(calculation)
            
            return {
              ...prev,
              display: result.toString(),
              previousValue: null,
              operation: null,
              waitingForNumber: true
            }
          }
          return prev

        case 'function':
          switch (button.value) {
            case 'clear':
              return {
                display: "0",
                previousValue: null,
                operation: null,
                waitingForNumber: false,
                history: prev.history
              }
            
            case 'clearEntry':
              return {
                ...prev,
                display: "0"
              }
            
            case 'backspace':
              const newDisplay = prev.display.length > 1 
                ? prev.display.slice(0, -1) 
                : "0"
              return {
                ...prev,
                display: newDisplay
              }
            
            case 'negate':
              const negatedValue = parseFloat(prev.display) * -1
              return {
                ...prev,
                display: negatedValue.toString()
              }
            
            default:
              return prev
          }

        default:
          return prev
      }
    })
  }, [calculate, addToHistory])

  const clearHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      history: []
    }))
  }, [])

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <CalculatorIcon className="text-gray-700 mr-2" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Calculadora</h2>
        </div>

        {/* Display */}
        <Card>
          <CardContent className="p-4">
            <div className="text-right">
              <div className="text-sm text-gray-500 h-5">
                {state.previousValue !== null && state.operation && (
                  `${state.previousValue} ${state.operation}`
                )}
              </div>
              <div className="text-3xl font-mono font-bold text-gray-900 min-h-[2.5rem] flex items-end justify-end">
                {state.display}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons Grid */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {calculatorButtons.map((button, index) => (
                <Button
                  key={index}
                  onClick={() => handleButtonClick(button)}
                  className={`h-12 text-lg font-semibold ${
                    button.className || "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
                  }`}
                  variant={button.className ? "default" : "outline"}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* History */}
        {state.history.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Histórico</CardTitle>
                <Button
                  onClick={clearHistory}
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2"
                >
                  <RotateCcw size={12} className="mr-1" />
                  Limpar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {state.history.slice().reverse().map((calculation, index) => (
                  <div
                    key={index}
                    className="text-xs font-mono text-gray-600 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      const result = calculation.split(' = ')[1]
                      setState(prev => ({
                        ...prev,
                        display: result,
                        waitingForNumber: false
                      }))
                    }}
                  >
                    {calculation}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <div className="text-center text-xs text-gray-500">
          Use as teclas do teclado ou clique nos botões
        </div>
      </div>
    </div>
  )
}