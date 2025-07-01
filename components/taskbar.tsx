"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useWindowStore } from "@/store/window-store"
import { Button } from "@/components/ui/button"
import { ComputerIcon as Windows } from "lucide-react"

export default function Taskbar() {
  const { windows, focusWindow, toggleStartMenu, isStartMenuOpen } = useWindowStore()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 flex items-center px-2 z-50"
      initial={{ y: 48 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      {/* Start Button */}
      <Button
        variant="ghost"
        size="sm"
        className={`text-white hover:bg-white/10 ${isStartMenuOpen ? "bg-white/20" : ""}`}
        onClick={toggleStartMenu}
      >
        <Windows size={16} className="mr-2" />
        Iniciar
      </Button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center space-x-1 px-2">
        {windows
          .filter((w) => !w.isMinimized)
          .map((window) => (
            <Button
              key={window.id}
              variant="ghost"
              size="sm"
              className={`text-white hover:bg-white/10 ${
                window.isActive ? "bg-white/20 border-b-2 border-blue-400" : ""
              }`}
              onClick={() => focusWindow(window.id)}
            >
              {window.title}
            </Button>
          ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-4 text-white text-sm">
        <div className="text-center">
          <div>{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </motion.div>
  )
}
