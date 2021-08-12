interface ISocialNetwork {
  title: string
  link: string
  file: string
}

export const socialNetworks: ISocialNetwork[] = [
  {
    title: 'Github',
    link: 'https://github.com/shock-dev',
    file: 'github.svg'
  },
  {
    title: 'Vk',
    link: 'https://vk.com/shockwtf',
    file: 'vk.svg'
  },
  {
    title: 'Telegram',
    link: 'https://t.me/shock_dev',
    file: 'telegram.svg'
  }
];
