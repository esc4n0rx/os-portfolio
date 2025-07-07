"use client"

import { motion } from "framer-motion"
import { useWindowStore } from "@/store/window-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  User,
  Folder,
  Mail,
  FileText,
  Power,
  Settings,
  Search,
  Grid3x3,
  Calendar,
  Calculator,
  Camera,
  Music,
  Globe,
  Image,
} from "lucide-react"

export default function StartMenu() {
  const { openWindow, toggleStartMenu } = useWindowStore()

  const pinnedApps = [
    { id: "projects", label: "Projetos", icon: Folder, color: "bg-yellow-500" },
    { id: "about", label: "Sobre Mim", icon: User, color: "bg-blue-500" },
    { id: "contact", label: "Contato", icon: Mail, color: "bg-green-500" },
    { id: "resume", label: "Currículo", icon: FileText, color: "bg-red-500" },
    { id: "calculator", label: "Calculadora", icon: Calculator, color: "bg-gray-700" },
    { id: "calendar", label: "Calendário", icon: Calendar, color: "bg-blue-600" },
    { id: "Music", label: "Música", icon: Music, color: "bg-purple-500" },
  ]

  const recentFiles = ["Projeto_Portfolio.docx", "Curriculo_2024.pdf", "Apresentacao_Cliente.pptx"]

  const handleItemClick = (id: string, label: string) => {
    openWindow(id, label)
    toggleStartMenu()
  }

  return (
    <motion.div
      className="fixed bottom-12 left-0 w-[640px] h-[600px] bg-gray-900/98 backdrop-blur-md border border-gray-700/50 rounded-t-lg z-40 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header com busca */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Digite aqui para pesquisar"
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar esquerda */}
        <div className="w-48 bg-gray-800/30 p-4 space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Desenvolvedor</div>
            </div>
          </div>

          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700/50 text-sm">
              <FileText size={16} className="mr-3" />
              Documentos
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700/50 text-sm">
              <Image size={16} className="mr-3" />
              Imagens
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700/50 text-sm">
              <Settings size={16} className="mr-3" />
              Configurações
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-48">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-red-600/20 text-sm"
              onClick={() => window.location.reload()}
            >
              <Power size={16} className="mr-3" />
              Desligar
            </Button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Apps fixados */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Fixados</h3>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Grid3x3 size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {pinnedApps.map((app) => (
                <motion.div
                  key={app.id}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-700/30 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleItemClick(app.id, app.label)}
                >
                  <div
                    className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <app.icon size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xs text-center leading-tight">{app.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arquivos recentes */}
          <div>
            <h3 className="text-white font-medium mb-3">Recentes</h3>
            <div className="space-y-2">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/30 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <FileText size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white text-sm">{file}</div>
                    <div className="text-gray-400 text-xs">Modificado hoje</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
