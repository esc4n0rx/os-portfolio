"use client"

import { useReducer, useRef, useEffect, useCallback } from 'react'
import { PlayerState, PlayerAction, Track } from '@/types/music'
import { defaultTracks, getMusicUrl } from '@/data/music-data'

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.7,
  isShuffled: false,
  repeatMode: 'none',
  playlist: defaultTracks,
  currentIndex: 0
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true }
    
    case 'PAUSE':
      return { ...state, isPlaying: false }
    
    case 'NEXT':
      const nextIndex = state.currentIndex < state.playlist.length - 1 
        ? state.currentIndex + 1 
        : state.repeatMode === 'all' ? 0 : state.currentIndex
      
      return {
        ...state,
        currentIndex: nextIndex,
        currentTrack: state.playlist[nextIndex],
        currentTime: 0
      }
    
    case 'PREVIOUS':
      const prevIndex = state.currentIndex > 0 
        ? state.currentIndex - 1 
        : state.repeatMode === 'all' ? state.playlist.length - 1 : 0
      
      return {
        ...state,
        currentIndex: prevIndex,
        currentTrack: state.playlist[prevIndex],
        currentTime: 0
      }
    
    case 'SET_TRACK':
      return {
        ...state,
        currentIndex: action.trackIndex,
        currentTrack: state.playlist[action.trackIndex],
        currentTime: 0
      }
    
    case 'SET_TIME':
      return { ...state, currentTime: action.time }
    
    case 'SET_VOLUME':
      return { ...state, volume: action.volume }
    
    case 'TOGGLE_SHUFFLE':
      return { ...state, isShuffled: !state.isShuffled }
    
    case 'TOGGLE_REPEAT':
      const nextRepeat = state.repeatMode === 'none' 
        ? 'all' 
        : state.repeatMode === 'all' 
        ? 'one' 
        : 'none'
      return { ...state, repeatMode: nextRepeat }
    
    case 'UPDATE_TIME':
      return { ...state, currentTime: action.time }
    
    default:
      return state
  }
}

export function useAudioPlayer() {
  const [state, dispatch] = useReducer(playerReducer, initialState)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Inicializar audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = state.volume

    const audio = audioRef.current

    const handleEnded = () => {
      if (state.repeatMode === 'one') {
        audio.currentTime = 0
        audio.play()
      } else {
        dispatch({ type: 'NEXT' })
      }
    }

    const handleLoadedMetadata = () => {
      if (state.isPlaying) {
        audio.play()
      }
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Atualizar fonte de áudio quando a faixa muda
  useEffect(() => {
    if (state.currentTrack && audioRef.current) {
      audioRef.current.src = getMusicUrl(state.currentTrack.fileName)
    }
  }, [state.currentTrack])

  // Controlar reprodução
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.play().catch(console.error)
        startTimeTracking()
      } else {
        audioRef.current.pause()
        stopTimeTracking()
      }
    }
  }, [state.isPlaying])

  // Atualizar volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume
    }
  }, [state.volume])

  // Atualizar posição
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = state.currentTime
    }
  }, [state.currentTime])

  const startTimeTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current && state.isPlaying) {
        dispatch({ type: 'UPDATE_TIME', time: audioRef.current.currentTime })
      }
    }, 1000)
  }, [state.isPlaying])

  const stopTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Inicializar primeira faixa
  useEffect(() => {
    if (!state.currentTrack && state.playlist.length > 0) {
      dispatch({ type: 'SET_TRACK', trackIndex: 0 })
    }
  }, [state.currentTrack, state.playlist])

  const play = useCallback(() => dispatch({ type: 'PLAY' }), [])
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), [])
  const next = useCallback(() => dispatch({ type: 'NEXT' }), [])
  const previous = useCallback(() => dispatch({ type: 'PREVIOUS' }), [])
  const setTrack = useCallback((index: number) => dispatch({ type: 'SET_TRACK', trackIndex: index }), [])
  const setTime = useCallback((time: number) => dispatch({ type: 'SET_TIME', time }), [])
  const setVolume = useCallback((volume: number) => dispatch({ type: 'SET_VOLUME', volume }), [])
  const toggleShuffle = useCallback(() => dispatch({ type: 'TOGGLE_SHUFFLE' }), [])
  const toggleRepeat = useCallback(() => dispatch({ type: 'TOGGLE_REPEAT' }), [])

  return {
    state,
    actions: {
      play,
      pause,
      next,
      previous,
      setTrack,
      setTime,
      setVolume,
      toggleShuffle,
      toggleRepeat
    }
  }
}