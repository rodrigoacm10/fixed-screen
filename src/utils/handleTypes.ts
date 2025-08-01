import { RandomIcon } from '../components/icons/RandomIcon'
import { TwitchIcon } from '../components/icons/TwitchIcon'
import { YoutubeIcon } from '../components/icons/YoutubeIcon'

export const handleTypes = [
  {
    type: 'random',
    title: 'Random',
    subTitle: 'Insira url de um vídeo',
    placeholder:
      'https://docs.google.com/document/d/1aJTx22S6WyqoNE6prNiU0qtRRtrP4QqJFEsbw8BKppA/edit?usp=sharing',
    Icon: RandomIcon,
    getUrl: (url: string) => {
      // https://docs.google.com/document/d/1aJTx22S6WyqoNE6prNiU0qtRRtrP4QqJFEsbw8BKppA/edit?usp=sharing

      return url
    },
  },
  {
    type: 'youtube',
    title: 'Youtube',
    subTitle: 'Insira url de um vídeo',
    placeholder: 'https://www.youtube.com/watch?v=4iN84gLicnM',
    Icon: YoutubeIcon,
    getUrl: (url: string) => {
      // https://www.youtube.com/watch?v=4iN84gLicnM -> errado
      // https://www.youtube.com/embed/rggg1mrQTMY -> certo

      const codeYt = url.split('watch?v=')[1].slice(0, 11)
      return `https://www.youtube.com/embed/${codeYt}`
    },
  },
  {
    type: 'twitch',
    title: 'Twitch',
    subTitle: 'Insira url de um vídeo',
    placeholder: 'https://www.twitch.tv/baiano',
    Icon: TwitchIcon,
    getUrl: (url: string) => {
      // https://www.twitch.tv/baiano - errado
      // https://player.twitch.tv/?channel=baiano&parent=localhost -> certo video
      // https://www.twitch.tv/embed/baiano/chat?parent=localhost -> certo chat

      // arurmar
      const channelTwitch = url.split('tv/')[1]
      return `https://player.twitch.tv/?channel=${channelTwitch}&parent=${
        import.meta.env.VITE_API_URL
      }`
    },
  },
] as const

export type HandleTypesType = (typeof handleTypes)[number]['type']
