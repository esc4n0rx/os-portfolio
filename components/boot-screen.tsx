"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BootScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const bootSteps = [
    "Inicializando sistema...",
    "Carregando drivers...",
    "Verificando hardware...",
    "Configurando rede...",
    "Carregando portfólio...",
    "Finalizando inicialização...",
  ]

  const [terminalLines, setTerminalLines] = useState<string[]>([])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      if (currentStep < bootSteps.length - 1) {
        setCurrentStep((prev) => prev + 1)
        setTerminalLines((prev) => [...prev, `[OK] ${bootSteps[currentStep]}`])
      }
    }, 800) // Aumentado de 400ms para 800ms

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 8 // Reduzido de 15 para 8 para progresso mais lento
      })
    }, 300) // Aumentado de 200ms para 300ms

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [currentStep, bootSteps])

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-green-400 font-mono relative overflow-hidden">
      {/* Efeito de matriz no fundo */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            {Math.random().toString(36).substring(7)}
          </motion.div>
        ))}
      </div>

      {/* Logo animado */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-green-400 rounded-lg flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 197, 94, 0.5)",
                "0 0 40px rgba(34, 197, 94, 0.8)",
                "0 0 20px rgba(34, 197, 94, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="text-2xl font-bold"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              OS
            </motion.div>
          </motion.div>

          {/* Partículas ao redor do logo */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * 40],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * 40],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Nome do sistema */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          <motion.span
            animate={{ color: ["#22c55e", "#10b981", "#059669", "#22c55e"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Portfolio OS
          </motion.span>
        </h1>
        <p className="text-green-300">Versão 2024.1.0</p>
      </motion.div>

      {/* Terminal de boot */}
      <motion.div
        className="w-full max-w-2xl bg-black/80 border border-green-400/30 rounded-lg p-4 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center mb-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="ml-4 text-sm text-green-300">Sistema de Boot</span>
        </div>

        <div className="h-32 overflow-hidden text-sm">
          <AnimatePresence>
            {terminalLines.map((line, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-1">
                <span className="text-green-400">root@portfolio:~$ </span>
                <span className="text-green-300">{line}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cursor piscando */}
          <motion.div
            className="inline-block w-2 h-4 bg-green-400 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>

      {/* Barra de progresso */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex justify-between text-sm mb-2">
          <span>Carregando sistema...</span>
          <span>{Math.round(loadingProgress)}%</span>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Efeito de brilho na barra */}
        <motion.div
          className="w-full h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full -mt-2"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {/* Informações do sistema */}
      <motion.div
        className="absolute bottom-8 left-8 text-xs text-green-300/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div>CPU: Intel Core i7-12700K @ 3.60GHz</div>
        <div>RAM: 16GB DDR4</div>
        <div>GPU: NVIDIA GeForce RTX 3070</div>
        <div>Build: 2024.01.15-dev</div>
      </motion.div>

      {/* Versão no canto */}
      <motion.div
        className="absolute bottom-8 right-8 text-xs text-green-300/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Portfolio OS v2024.1.0
        <br />
        Desenvolvido com ❤️
      </motion.div>
    </div>
  )
}
