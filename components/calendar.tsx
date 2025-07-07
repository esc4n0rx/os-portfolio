"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  Users,
  CheckSquare,
  Bell,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { CalendarState, CalendarEvent, CalendarDay } from "@/types/calendar"
import { 
  getCalendarDays, 
  formatMonthYear, 
  addMonths, 
  isSameDay,
  generateSampleEvents,
  formatDate
} from "@/lib/calendar-utils"

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

const eventTypeConfig = {
  meeting: { icon: Users, color: 'bg-blue-100 text-blue-800', bgColor: 'bg-blue-500' },
  task: { icon: CheckSquare, color: 'bg-green-100 text-green-800', bgColor: 'bg-green-500' },
  reminder: { icon: Bell, color: 'bg-yellow-100 text-yellow-800', bgColor: 'bg-yellow-500' },
  personal: { icon: User, color: 'bg-purple-100 text-purple-800', bgColor: 'bg-purple-500' }
}

export default function Calendar() {
  const [state, setState] = useState<CalendarState>({
    currentDate: new Date(),
    selectedDate: null,
    events: generateSampleEvents(),
    view: 'month'
  })

  const calendarDays = getCalendarDays(state.currentDate, state.events)

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setState(prev => ({
      ...prev,
      currentDate: addMonths(prev.currentDate, direction === 'next' ? 1 : -1)
    }))
  }, [])

  const selectDate = useCallback((date: Date) => {
    setState(prev => ({
      ...prev,
      selectedDate: isSameDay(date, prev.selectedDate || new Date('1900-01-01')) ? null : date
    }))
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setState(prev => ({
      ...prev,
      currentDate: today,
      selectedDate: today
    }))
  }, [])

  const selectedDateEvents = state.selectedDate 
    ? state.events.filter(event => isSameDay(event.date, state.selectedDate!))
    : []

  const todaysEvents = state.events.filter(event => isSameDay(event.date, new Date()))

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="text-blue-600" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Calendário</h1>
              <p className="text-gray-600">Gerencie seus compromissos e eventos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={goToToday} variant="outline" size="sm">
              Hoje
            </Button>
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    {formatMonthYear(state.currentDate)}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => navigateMonth('prev')}
                      variant="outline"
                      size="sm"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      onClick={() => navigateMonth('next')}
                      variant="outline"
                      size="sm"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Week Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div
                      key={day}
                      className="p-3 text-center text-sm font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  <AnimatePresence mode="wait">
                    {calendarDays.map((day, index) => {
                      const isSelected = state.selectedDate && isSameDay(day.date, state.selectedDate)
                      
                      return (
                        <motion.div
                          key={`${day.date.getMonth()}-${day.date.getDate()}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.01 }}
                          className={`
                            min-h-[80px] p-2 border border-gray-200 cursor-pointer
                            transition-all duration-200 hover:bg-blue-50 relative
                            ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                            ${day.isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                            ${isSelected ? 'bg-blue-100 ring-2 ring-blue-600' : ''}
                          `}
                          onClick={() => selectDate(day.date)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`
                              text-sm font-medium
                              ${day.isToday ? 'text-blue-600 font-bold' : ''}
                            `}>
                              {day.date.getDate()}
                            </span>
                            
                            {day.events.length > 0 && (
                              <div className="flex space-x-1">
                                {day.events.slice(0, 2).map((event, i) => {
                                  const config = eventTypeConfig[event.type]
                                  return (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${config.bgColor}`}
                                    />
                                  )
                                })}
                                {day.events.length > 2 && (
                                  <span className="text-xs text-gray-500">+{day.events.length - 2}</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Event Preview */}
                          {day.events.slice(0, 2).map((event, i) => (
                            <div
                              key={i}
                              className="text-xs p-1 mb-1 rounded truncate bg-gray-100 text-gray-700"
                              title={event.title}
                            >
                              {event.time && (
                                <span className="text-gray-500">{event.time} </span>
                              )}
                              {event.title}
                            </div>
                          ))}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock size={18} className="mr-2" />
                  Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysEvents.length > 0 ? (
                  <div className="space-y-3">
                    {todaysEvents.map(event => {
                      const config = eventTypeConfig[event.type]
                      const IconComponent = config.icon
                      
                      return (
                        <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`p-1 rounded ${config.bgColor}`}>
                            <IconComponent size={14} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {event.title}
                            </p>
                            {event.time && (
                              <p className="text-xs text-gray-500">{event.time}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Nenhum evento hoje</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {state.selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {formatDate(state.selectedDate)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map(event => {
                        const config = eventTypeConfig[event.type]
                        const IconComponent = config.icon
                        
                        return (
                          <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <IconComponent size={16} className="text-gray-600" />
                                <p className="font-medium text-sm">{event.title}</p>
                              </div>
                              <Badge className={config.color}>
                                {event.type}
                              </Badge>
                            </div>
                            
                            {event.time && (
                              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                                <Clock size={12} />
                                <span>{event.time}</span>
                              </div>
                            )}
                            
                            {event.description && (
                              <p className="text-xs text-gray-600 mt-1">
                                {event.description}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CalendarIcon size={24} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Nenhum evento nesta data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total de eventos</span>
                    <Badge variant="secondary">{state.events.length}</Badge>
                  </div>
                  
                  <Separator />
                  
                  {Object.entries(eventTypeConfig).map(([type, config]) => {
                    const count = state.events.filter(e => e.type === type).length
                    const IconComponent = config.icon
                    
                    return count > 0 ? (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent size={14} className="text-gray-600" />
                          <span className="text-sm text-gray-600 capitalize">{type}</span>
                        </div>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}