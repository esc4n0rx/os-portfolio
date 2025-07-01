"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface DesktopIconProps {
  id: string
  label: string
  icon: LucideIcon
  x: number
  y: number
  onDoubleClick: () => void
}

export default function DesktopIcon({ label, icon: Icon, x, y, onDoubleClick }: DesktopIconProps) {
  const [clickCount, setClickCount] = useState(0)
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
    setIsSelected(true)

    setTimeout(() => {
      if (clickCount === 0) {
        // Primeiro clique - apenas seleciona
        setClickCount(0)
      } else {
        // Segundo clique - abre a janela
        onDoubleClick()
        setClickCount(0)
        setIsSelected(false)
      }
    }, 300)
  }

  return (
    <motion.div
      className={`absolute flex flex-col items-center cursor-pointer select-none group ${
        isSelected ? "bg-blue-500/20 rounded-lg p-2" : ""
      }`}
      style={{ left: x, top: y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/20 transition-colors">
        <Icon size={32} className="text-white" />
      </div>
      <span className="text-white text-sm text-center bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{label}</span>
    </motion.div>
  )
}
