export const types = [
  {
    type: 'random',
    title: 'Random',
    subTitle: 'Insira url de um vídeo',
    placeholder:
      'https://docs.google.com/document/d/1aJTx22S6WyqoNE6prNiU0qtRRtrP4QqJFEsbw8BKppA/edit?usp=sharing',
    Icon: '',
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
    Icon: '',
    getUrl: (url: string) => {
      // https://www.youtube.com/watch?v=4iN84gLicnM -> errado
      // https://www.youtube.com/embed/rggg1mrQTMY -> certo

      const codeYt = url.split('=')[1]
      return `https://www.youtube.com/embed/${codeYt}`
    },
  },
  {
    type: 'twitch',
    title: 'Twitch',
    subTitle: 'Insira url de um vídeo',
    placeholder: 'https://www.twitch.tv/baiano',
    Icon: '',
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
]
