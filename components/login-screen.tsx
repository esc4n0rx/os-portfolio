"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"

interface LoginScreenProps {
  onLoginComplete: () => void
}

export default function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggingIn(true)
      setTimeout(onLoginComplete, 1500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [onLoginComplete])

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-nnlaYhACfLRFmffxBfN4MSZTc5Wb66.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white"
      >
        <motion.div
          className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <User size={64} className="text-white" />
        </motion.div>

        <h2 className="text-3xl font-light mb-2">Desenvolvedor</h2>
        <p className="text-lg text-gray-300 mb-8">Bem-vindo ao meu portfólio</p>

        {isLoggingIn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center space-x-2"
          >
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <span>Entrando...</span>
          </motion.div>
        ) : (
          <motion.div
            className="text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Clique para entrar
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
