"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  List,
  Music as MusicIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import React from "react"

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const { state, actions } = useAudioPlayer()
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.7)

  const handleVolumeToggle = () => {
    if (isMuted) {
      setIsMuted(false)
      actions.setVolume(previousVolume)
    } else {
      setIsMuted(true)
      setPreviousVolume(state.volume)
      actions.setVolume(0)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const volume = value[0]
    actions.setVolume(volume)
    setIsMuted(volume === 0)
    if (volume > 0) {
      setPreviousVolume(volume)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (state.currentTrack) {
      const time = (value[0] / 100) * state.currentTrack.duration
      actions.setTime(time)
    }
  }

  const getRepeatIcon = () => {
    switch (state.repeatMode) {
      case 'one': return Repeat1
      case 'all': return Repeat
      default: return Repeat
    }
  }

  const progress = state.currentTrack 
    ? (state.currentTime / state.currentTrack.duration) * 100 
    : 0

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MusicIcon className="text-purple-600" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Music Player</h1>
              <p className="text-gray-600">Reproduzindo suas músicas favoritas</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowPlaylist(!showPlaylist)}
            variant={showPlaylist ? "default" : "outline"}
            size="sm"
          >
            <List size={16} className="mr-2" />
            Playlist
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player Principal */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                {/* Cover Art e Info da Música */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-6xl shadow-2xl"
                    animate={{ 
                      rotate: state.isPlaying ? 360 : 0,
                      scale: state.isPlaying ? 1.05 : 1
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 0.3 }
                    }}
                  >
                    {state.currentTrack?.coverArt || '🎵'}
                  </motion.div>
                  
                  {state.currentTrack && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {state.currentTrack.title}
                      </h2>
                      <p className="text-lg text-gray-600 mb-1">
                        {state.currentTrack.artist}
                      </p>
                      <p className="text-sm text-gray-500">
                        {state.currentTrack.album}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <Slider
                    value={[progress]}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{formatTime(state.currentTime)}</span>
                    <span>{state.currentTrack ? formatTime(state.currentTrack.duration) : '0:00'}</span>
                  </div>
                </div>

                {/* Controles Principais */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Button
                    onClick={actions.toggleShuffle}
                    variant={state.isShuffled ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full"
                  >
                    <Shuffle size={16} />
                  </Button>

                  <Button
                    onClick={actions.previous}
                    variant="ghost"
                    size="lg"
                    className="rounded-full"
                  >
                    <SkipBack size={20} />
                  </Button>

                  <Button
                    onClick={state.isPlaying ? actions.pause : actions.play}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {state.isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </Button>

                  <Button
                    onClick={actions.next}
                    variant="ghost"
                    size="lg"
                    className="rounded-full"
                  >
                    <SkipForward size={20} />
                  </Button>

                  <Button
                    onClick={actions.toggleRepeat}
                    variant={state.repeatMode !== 'none' ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full"
                  >
                    {React.createElement(getRepeatIcon(), { size: 16 })}
                  </Button>
                </div>

                {/* Controle de Volume */}
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={handleVolumeToggle}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  >
                    {isMuted || state.volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                  
                  <Slider
                    value={[state.volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.01}
                    className="flex-1 max-w-32"
                  />
                  
                  <span className="text-sm text-gray-500 w-8">
                    {Math.round(state.volume * 100)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Playlist */}
          <AnimatePresence>
            {showPlaylist && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-1"
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Playlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {state.playlist.map((track, index) => (
                        <motion.div
                          key={track.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            index === state.currentIndex
                              ? 'bg-purple-100 border border-purple-300'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => actions.setTrack(index)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{track.coverArt}</div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm truncate ${
                                index === state.currentIndex ? 'text-purple-700' : 'text-gray-900'
                              }`}>
                                {track.title}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {track.artist} • {formatTime(track.duration)}
                              </p>
                            </div>
                            
                            {index === state.currentIndex && state.isPlaying && (
                              <motion.div
                                className="w-3 h-3 bg-purple-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Informações Adicionais */}
        <Card className="bg-white/60 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total de músicas: {state.playlist.length}</span>
              <span>
                Modo: {state.isShuffled ? 'Aleatório' : 'Normal'} • 
                Repetir: {
                  state.repeatMode === 'none' ? 'Desligado' :
                  state.repeatMode === 'one' ? 'Uma música' : 'Todas'
                }
              </span>
              <span>
                {state.isPlaying ? 'Tocando' : 'Pausado'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}