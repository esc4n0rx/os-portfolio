export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  type: 'folder'
  icon: string
  color: string
  content: ProjectContent
}

export interface ProjectContent {
  overview: string
  features: string[]
  challenges: string[]
  technologies: TechDetail[]
  demo?: string
  github?: string
  images?: string[]
  learnings: string[]
}

export interface TechDetail {
  name: string
  description: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'deployment'
}