import { Track } from '@/types/music'

export const defaultTracks: Track[] = [
  {
    id: '1',
    title: 'Lofi Study Session',
    artist: 'Ambient Sounds',
    album: 'Focus Music',
    duration: 2220, // 3 minutos
    fileName: 'lofi-study.mp3',
    coverArt: '🎵'
  },
  {
    id: '2',
    title: 'Electronic Dreams',
    artist: 'Synth Wave',
    album: 'Digital Vibes',
    duration: 240, // 4 minutos
    fileName: 'electronic-dreams.mp3',
    coverArt: '🎶'
  },
  {
    id: '3',
    title: 'Calm Piano',
    artist: 'Peaceful Melodies',
    album: 'Relaxation',
    duration: 540, // 3.5 minutos
    fileName: 'calm-piano.mp3',
    coverArt: '🎹'
  }
]

// Agora aponta para os arquivos reais na pasta public
export const getMusicUrl = (fileName: string): string => {
  return `/data/music/${fileName}`
}