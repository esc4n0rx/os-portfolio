"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Code, Target, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Project } from "@/types/project"

interface ProjectDocumentProps {
  project: Project
  onBack: () => void
}

export default function ProjectDocument({ project, onBack }: ProjectDocumentProps) {
  const getTechCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return '🎨'
      case 'backend': return '⚙️'
      case 'database': return '🗄️'
      case 'tools': return '🔧'
      case 'deployment': return '🚀'
      default: return '💻'
    }
  }

  const getTechCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'bg-blue-100 text-blue-800'
      case 'backend': return 'bg-green-100 text-green-800'
      case 'database': return 'bg-purple-100 text-purple-800'
      case 'tools': return 'bg-orange-100 text-orange-800'
      case 'deployment': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      className="p-6 bg-white min-h-full overflow-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header com navegação */}
      <div className="flex items-center mb-6 pb-4 border-b">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
        <div className="text-4xl mr-4">{project.icon}</div>
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
      </div>

      {/* Links de ação */}
      <div className="flex gap-3 mb-8">
        {project.content.demo && (
          <Button asChild>
            <a href={project.content.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              Ver Demo
            </a>
          </Button>
        )}
        {project.content.github && (
          <Button variant="outline" asChild>
            <a href={project.content.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" />
              Código Fonte
            </a>
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {/* Visão Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen size={20} className="mr-2" />
              Visão Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.content.overview}
            </p>
          </CardContent>
        </Card>

        {/* Funcionalidades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles size={20} className="mr-2" />
              Principais Funcionalidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {project.content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tecnologias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code size={20} className="mr-2" />
              Stack Tecnológico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['frontend', 'backend', 'database', 'tools', 'deployment'].map(category => {
                const techs = project.content.technologies.filter(t => t.category === category)
                if (techs.length === 0) return null
                
                return (
                  <div key={category}>
                    <h4 className="font-semibold text-sm text-gray-600 mb-3 flex items-center">
                      <span className="mr-2">{getTechCategoryIcon(category)}</span>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {techs.map((tech, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{tech.name}</span>
                            <Badge className={getTechCategoryColor(tech.category)}>
                              {tech.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{tech.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Desafios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target size={20} className="mr-2" />
              Principais Desafios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.content.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{challenge}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aprendizados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen size={20} className="mr-2" />
              Principais Aprendizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.content.learnings.map((learning, index) => (
                <div key={index} className="flex items-center space-x-3 p-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-700">{learning}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}