"use client"

import { create } from "zustand"

interface WindowState {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  data?: any // Para dados específicos da janela (como projeto selecionado)
}

interface WindowStore {
  windows: WindowState[]
  isStartMenuOpen: boolean
  openWindow: (id: string, title: string, data?: any) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindow: (id: string, updates: Partial<WindowState>) => void
  toggleStartMenu: () => void
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  isStartMenuOpen: false,

  openWindow: (id: string, title: string, data?: any) => {
    console.log("Opening window:", id, title, data) // Debug log
    const { windows } = get()
    const existingWindow = windows.find((w) => w.id === id)

    if (existingWindow) {
      console.log("Window exists, focusing:", id) // Debug log
      // Focus existing window and update data if provided
      set({
        windows: windows.map((w) => ({
          ...w,
          isActive: w.id === id,
          isMinimized: w.id === id ? false : w.isMinimized,
          data: w.id === id && data ? data : w.data,
        })),
      })
    } else {
      console.log("Creating new window:", id) // Debug log
      // Create new window
      const newWindow: WindowState = {
        id,
        title,
        isActive: true,
        isMinimized: false,
        position: {
          x: 100 + windows.length * 30,
          y: 100 + windows.length * 30,
        },
        size: { width: 700, height: 600 }, // Aumentado o tamanho padrão
        data,
      }

      set({
        windows: [...windows.map((w) => ({ ...w, isActive: false })), newWindow],
      })
    }
  },

  closeWindow: (id: string) => {
    set({
      windows: get().windows.filter((w) => w.id !== id),
    })
  },

  minimizeWindow: (id: string) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, isMinimized: true, isActive: false } : w)),
    })
  },

  focusWindow: (id: string) => {
    set({
      windows: get().windows.map((w) => ({
        ...w,
        isActive: w.id === id,
        isMinimized: w.id === id ? false : w.isMinimized,
      })),
    })
  },

  updateWindow: (id: string, updates: Partial<WindowState>) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    })
  },

  toggleStartMenu: () => {
    set({ isStartMenuOpen: !get().isStartMenuOpen })
  },
}))