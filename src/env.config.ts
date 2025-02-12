const MODE_APP: any = 'dev'

export const MODE_APP_DEFINED = (Developpement: any, Production: any) => {
  return MODE_APP === 'dev' ? Developpement : Production
}

export const envConfig = () => {
  return {
    HOST_SERVER: MODE_APP_DEFINED('http://localhost:8080', 'https://djoumaf.net'),
    HOST_SERVER_IMAGE: MODE_APP_DEFINED(
      'http://localhost:8080/images/storage/',
      'https://api.djoumaf.net/images/storage/',
    ),
    DEFAULT_IMAGE_PROFILE: '/images/profile.jpg',
    DEFAULT_IMAGE_PROFILE_COVER: '/images/banner.png',
    VERSION_APP: 'v-1.5.1',
    MODE_APP,
  }
}
