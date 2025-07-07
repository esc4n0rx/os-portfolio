export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number // em segundos
  fileName: string
  coverArt?: string
}

export interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  volume: number
  isShuffled: boolean
  repeatMode: 'none' | 'one' | 'all'
  playlist: Track[]
  currentIndex: number
}

export type PlayerAction = 
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_TRACK'; trackIndex: number }
  | { type: 'SET_TIME'; time: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'UPDATE_TIME'; time: number }