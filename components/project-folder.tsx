"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Folder, ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projectsData } from "@/data/project"
import type { Project } from "@/types/project"

interface ProjectFolderProps {
  onNavigateToProject: (project: Project) => void
}

export default function ProjectFolder({ onNavigateToProject }: ProjectFolderProps) {
  return (
    <div className="p-6 bg-white min-h-full">
      <div className="flex items-center mb-6 pb-4 border-b">
        <Folder className="text-yellow-500 mr-3" size={24} />
        <div>
          <h2 className="text-xl font-semibold">Meus Projetos</h2>
          <p className="text-gray-500 text-sm">Pasta contendo todos os projetos desenvolvidos</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 cursor-pointer group border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onDoubleClick={() => onNavigateToProject(project)}
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              {project.icon}
            </div>
            <span className="text-lg font-medium text-center mb-2">{project.name}</span>
            <span className="text-sm text-gray-500 text-center mb-3">{project.description}</span>
            
            <div className="flex flex-wrap gap-1 justify-center">
              {project.tech.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tech.length - 3}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center">
          <ExternalLink size={16} className="mr-2" />
          Links Rápidos
        </h3>
        <div className="flex space-x-4">
          <Button size="sm" variant="outline">
            <Github size={14} className="mr-2" />
            Ver Todos no GitHub
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink size={14} className="mr-2" />
            Portfolio Online
          </Button>
        </div>
      </div>
    </div>
  )
}