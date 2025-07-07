import { CalendarEvent, CalendarDay } from '@/types/calendar'

export function getDaysInMonth(date: Date): Date[] {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  
  const days: Date[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }
  
  return days
}

export function getCalendarDays(date: Date, events: CalendarEvent[] = []): CalendarDay[] {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  
  // Ajustar para começar na segunda-feira
  const dayOfWeek = firstDay.getDay()
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  startDate.setDate(firstDay.getDate() - mondayOffset)
  
  const days: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < 42; i++) { // 6 semanas × 7 dias
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    const dayEvents = events.filter(event => 
      isSameDay(event.date, currentDate)
    )
    
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: isSameDay(currentDate, today),
      isSelected: false,
      events: dayEvents
    })
  }
  
  return days
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })
}

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export function generateSampleEvents(): CalendarEvent[] {
  const today = new Date()
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Reunião de equipe',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      type: 'meeting',
      time: '09:00',
      description: 'Reunião semanal da equipe de desenvolvimento'
    },
    {
      id: '2',
      title: 'Entrega do projeto',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      type: 'task',
      time: '18:00',
      description: 'Deadline para entrega do projeto cliente X'
    },
    {
      id: '3',
      title: 'Consulta médica',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
      type: 'personal',
      time: '14:30',
      description: 'Consulta de rotina'
    },
    {
      id: '4',
      title: 'Lembrete: Backup',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      type: 'reminder',
      time: '16:00',
      description: 'Fazer backup dos dados do servidor'
    },
    {
      id: '5',
      title: 'Stand-up diário',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      type: 'meeting',
      time: '09:30',
      description: 'Daily standup da equipe'
    }
  ]
  
  return events
}