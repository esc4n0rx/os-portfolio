"use client"

import { useWindowStore } from "@/store/window-store"
import Taskbar from "@/components/taskbar"
import DesktopIcon from "@/components/desktop-icon"
import Window from "@/components/window"
import StartMenu from "@/components/start-menu"
import { Folder, User, Mail, FileText } from "lucide-react"

const desktopIcons = [
  { id: "projects", label: "Projetos", icon: Folder, x: 50, y: 50 },
  { id: "about", label: "Sobre Mim", icon: User, x: 50, y: 150 },
  { id: "contact", label: "Contato", icon: Mail, x: 50, y: 250 },
  { id: "resume", label: "Currículo", icon: FileText, x: 50, y: 350 },
]

export default function Desktop() {
  const { windows, openWindow, isStartMenuOpen } = useWindowStore()

  const handleIconDoubleClick = (id: string, label: string) => {
    console.log("Desktop icon double clicked:", id, label) // Debug log
    openWindow(id, label)
  }

  return (
    <div
      className="h-screen w-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-nnlaYhACfLRFmffxBfN4MSZTc5Wb66.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            x={icon.x}
            y={icon.y}
            onDoubleClick={() => handleIconDoubleClick(icon.id, icon.label)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          isActive={window.isActive}
          isMinimized={window.isMinimized}
          position={window.position}
          size={window.size}
        />
      ))}

      {/* Start Menu */}
      {isStartMenuOpen && <StartMenu />}

      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}
