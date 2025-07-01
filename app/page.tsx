"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BootScreen from "@/components/boot-screen"
import LoginScreen from "@/components/login-screen"
import Desktop from "@/components/desktop"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"boot" | "login" | "desktop">("boot")

  useEffect(() => {
    // Boot sequence
    const bootTimer = setTimeout(() => {
      setCurrentScreen("login")
    }, 6000) // Aumentado de 3000ms para 6000ms

    return () => clearTimeout(bootTimer)
  }, [])

  const handleLoginComplete = () => {
    setCurrentScreen("desktop")
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {currentScreen === "boot" && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BootScreen />
          </motion.div>
        )}

        {currentScreen === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen onLoginComplete={handleLoginComplete} />
          </motion.div>
        )}

        {currentScreen === "desktop" && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
