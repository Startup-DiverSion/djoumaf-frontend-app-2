import { RouteLocationNormalizedLoaded } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
  }
}
