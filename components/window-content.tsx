"use client"

import type React from "react"

import { useState } from "react"
import { Github, Linkedin, Mail, Download, ExternalLink, Folder, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface WindowContentProps {
  windowId: string
}

export default function WindowContent({ windowId }: WindowContentProps) {
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const projects = [
    {
      id: "ecommerce",
      name: "E-commerce Platform",
      type: "folder",
      description: "Plataforma completa de e-commerce",
      tech: ["Next.js", "TypeScript", "Stripe"],
      icon: Folder,
      color: "text-yellow-500",
    },
    {
      id: "taskmanager",
      name: "Task Management App",
      type: "folder",
      description: "App de gerenciamento de tarefas",
      tech: ["React", "Node.js", "MongoDB"],
      icon: Folder,
      color: "text-blue-500",
    },
    {
      id: "portfolio",
      name: "Portfolio OS",
      type: "folder",
      description: "Portfólio em formato de OS",
      tech: ["Next.js", "Framer Motion", "Zustand"],
      icon: Folder,
      color: "text-green-500",
    },
    {
      id: "readme",
      name: "README.md",
      type: "file",
      description: "Documentação dos projetos",
      icon: FileText,
      color: "text-gray-400",
    },
  ]

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio de email
    alert("Email enviado com sucesso! (Simulação)")
    setEmailForm({ name: "", email: "", subject: "", message: "" })
  }

  const renderContent = () => {
    switch (windowId) {
      case "projects":
        return (
          <div className="p-6 bg-white min-h-full">
            <div className="flex items-center mb-6 pb-4 border-b">
              <Folder className="text-yellow-500 mr-3" size={24} />
              <div>
                <h2 className="text-xl font-semibold">Meus Projetos</h2>
                <p className="text-gray-500 text-sm">Pasta contendo todos os projetos desenvolvidos</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <project.icon
                    size={48}
                    className={`${project.color} mb-3 group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-sm font-medium text-center mb-1">{project.name}</span>
                  <span className="text-xs text-gray-500 text-center">{project.description}</span>
                  {project.tech && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <ExternalLink size={16} className="mr-2" />
                Links Rápidos
              </h3>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline">
                  <Github size={14} className="mr-2" />
                  GitHub
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink size={14} className="mr-2" />
                  Demo Live
                </Button>
              </div>
            </div>
          </div>
        )

      case "about":
        return (
          <div className="p-6 bg-white min-h-full font-mono text-sm leading-relaxed">
            <div className="flex items-center mb-4 pb-2 border-b">
              <FileText className="text-blue-500 mr-2" size={20} />
              <span className="font-semibold">sobre_mim.txt</span>
            </div>

            <div className="space-y-4 text-gray-800">
              <div>
                <span className="text-blue-600"># SOBRE MIM</span>
              </div>

              <div>
                <span className="text-green-600">Nome:</span> Desenvolvedor Full-Stack
                <br />
                <span className="text-green-600">Localização:</span> Brasil
                <br />
                <span className="text-green-600">Experiência:</span> 3+ anos
                <br />
                <span className="text-green-600">Status:</span> Disponível para projetos
              </div>

              <div>
                <span className="text-blue-600">## DESCRIÇÃO</span>
              </div>

              <p>
                Olá! Sou um desenvolvedor apaixonado por criar experiências digitais
                <br />
                incríveis. Minha jornada começou com curiosidade sobre como as coisas
                <br />
                funcionam na web, e hoje transformo ideias em aplicações funcionais
                <br />e elegantes.
              </p>

              <p>
                Trabalho principalmente com tecnologias modernas do ecossistema
                <br />
                JavaScript/TypeScript, sempre buscando as melhores práticas e<br />
                padrões de desenvolvimento.
              </p>

              <div>
                <span className="text-blue-600">## STACK PRINCIPAL</span>
              </div>

              <div className="pl-4">
                <div>
                  <span className="text-purple-600">Frontend:</span>
                </div>
                <div className="pl-4">
                  - React.js / Next.js
                  <br />- TypeScript
                  <br />- Tailwind CSS
                  <br />- Framer Motion
                </div>

                <div className="mt-2">
                  <span className="text-purple-600">Backend:</span>
                </div>
                <div className="pl-4">
                  - Node.js
                  <br />- Express.js
                  <br />- PostgreSQL / MongoDB
                  <br />- Prisma ORM
                </div>

                <div className="mt-2">
                  <span className="text-purple-600">DevOps:</span>
                </div>
                <div className="pl-4">
                  - Docker
                  <br />- Vercel / AWS
                  <br />- GitHub Actions
                  <br />- Linux
                </div>
              </div>

              <div>
                <span className="text-blue-600">## FILOSOFIA</span>
              </div>

              <p>
                "Código limpo não é escrito seguindo um conjunto de regras.
                <br />
                Você não se torna um artesão de software aprendendo uma lista
                <br />
                de heurísticas. Profissionalismo e artesanato vêm de valores
                <br />e disciplina." - Robert C. Martin
              </p>

              <div className="mt-6 p-3 bg-gray-100 rounded">
                <span className="text-gray-600">
                  Última modificação: {new Date().toLocaleDateString("pt-BR")}
                  <br />
                  Tamanho: 2.1 KB
                  <br />
                  Tipo: Documento de texto
                </span>
              </div>
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="p-6 bg-white min-h-full">
            <div className="flex items-center mb-6 pb-4 border-b">
              <Mail className="text-green-500 mr-3" size={24} />
              <div>
                <h2 className="text-xl font-semibold">Enviar Email</h2>
                <p className="text-gray-500 text-sm">Entre em contato comigo</p>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input
                  type="text"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                <Input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  placeholder="Assunto do email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <Textarea
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Digite sua mensagem aqui..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send size={16} className="mr-2" />
                Enviar Email
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold mb-4">Outras formas de contato:</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Linkedin className="mr-2" size={16} />
                  LinkedIn Profile
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Github className="mr-2" size={16} />
                  GitHub Profile
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="mr-2" size={16} />
                  seu.email@exemplo.com
                </Button>
              </div>
            </div>
          </div>
        )

      case "resume":
        return (
          <div className="p-6 bg-white min-h-full">
            <div className="flex items-center mb-6 pb-4 border-b">
              <FileText className="text-red-500 mr-3" size={24} />
              <div>
                <h2 className="text-xl font-semibold">Currículo</h2>
                <p className="text-gray-500 text-sm">Documento PDF - 245 KB</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <FileText size={48} className="text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Currículo_Desenvolvedor_2024.pdf</h3>
                  <p className="text-gray-600 mb-4">Clique no botão abaixo para baixar meu currículo completo</p>

                  <Button size="lg" className="mb-4">
                    <Download className="mr-2" size={16} />
                    Baixar Currículo (PDF)
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo Executivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• 3+ anos de experiência em desenvolvimento web</li>
                      <li>• Especialista em React/Next.js e Node.js</li>
                      <li>• Experiência com bancos de dados SQL e NoSQL</li>
                      <li>• Conhecimento em DevOps e deploy em cloud</li>
                      <li>• Metodologias ágeis (Scrum/Kanban)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certificações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• AWS Certified Developer</li>
                      <li>• Google Cloud Professional</li>
                      <li>• React Developer Certification</li>
                      <li>• Scrum Master Certified</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Experiência Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Desenvolvedor Full-Stack Senior</h4>
                      <p className="text-sm text-gray-600">TechCorp • 2022 - Presente</p>
                      <p className="text-sm mt-1">
                        Desenvolvimento de aplicações web escaláveis usando React, Next.js e Node.js
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Desenvolvedor Frontend</h4>
                      <p className="text-sm text-gray-600">StartupXYZ • 2021 - 2022</p>
                      <p className="text-sm mt-1">Criação de interfaces responsivas e otimização de performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aplicativo em Desenvolvimento</h3>
              <p className="text-gray-600">Esta funcionalidade será implementada em breve.</p>
            </div>
          </div>
        )
    }
  }

  return renderContent()
}
