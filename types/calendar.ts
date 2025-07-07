export interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: 'meeting' | 'task' | 'reminder' | 'personal'
  time?: string
  description?: string
}

export interface CalendarState {
  currentDate: Date
  selectedDate: Date | null
  events: CalendarEvent[]
  view: 'month' | 'week' | 'day'
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}