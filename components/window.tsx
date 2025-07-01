"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import { useWindowStore } from "@/store/window-store"
import WindowContent from "@/components/window-content"

interface WindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export default function Window({ id, title, isActive, isMinimized, position, size }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updateWindow } = useWindowStore()
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)

  if (isMinimized) return null

  return (
    <motion.div
      ref={dragRef}
      className={`absolute bg-white rounded-lg shadow-2xl overflow-hidden ${isActive ? "z-50" : "z-40"}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true)
        focusWindow(id)
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        updateWindow(id, {
          position: {
            x: Math.max(0, position.x + info.offset.x),
            y: Math.max(0, position.y + info.offset.y),
          },
        })
      }}
      onClick={() => focusWindow(id)}
    >
      {/* Window Header */}
      <div className="bg-gray-100 border-b px-4 py-2 flex items-center justify-between cursor-move">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(id)
            }}
            className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
          >
            <Minus size={12} className="text-white" />
          </button>
          <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
            <Square size={8} className="text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(id)
            }}
            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto">
        <WindowContent windowId={id} />
      </div>
    </motion.div>
  )
}
