import { Middleware } from '@nuxt/types'

const auth: Middleware = (context) => {
  console.log('[Middleware] Just Auth')

  if (!context.store.getters.isAuth) {
    context.redirect('/admin/auth')
  }
}

export default auth
