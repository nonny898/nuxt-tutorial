import { Middleware } from '@nuxt/types'

const checkAuth: Middleware = (context) => {
  console.log('[Middleware] Check Auth')
  context.store.dispatch('initAuth', context.req)
}

export default checkAuth
