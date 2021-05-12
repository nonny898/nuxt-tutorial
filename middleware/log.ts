import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = () => {
  console.log('[Middleware] The Log Middleware is running.')
  // Use context
}

export default myMiddleware
