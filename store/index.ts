import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Cookie from 'js-cookie'

export const state = () => ({
  loadedPosts: [] as object[],
  token: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  loadedPosts: (state) => state.loadedPosts,
  isAuth: (state) => state.token != null,
}

export const mutations: MutationTree<RootState> = {
  SET_POST: (state, posts: object[]) => (state.loadedPosts = posts),
  ADD_POST: (state, post: object) => state.loadedPosts.push(post),
  EDIT_POST: (state, editedPost: any) => {
    const postIndex = state.loadedPosts.findIndex((post: any) => {
      return post.id === editedPost.id
    })
    state.loadedPosts[postIndex] = editedPost
  },
  SET_TOKEN: (state, token: any) => {
    state.token = token
  },
  CLEAR_TOKEN: (state) => {
    state.token = null
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(vuexContext, context) {
    try {
      const res = await context.app.$axios.$get('/posts.json')
      const postsArray = []
      for (const key in res) {
        postsArray.push({ ...res[key], id: key })
      }
      vuexContext.commit('SET_POST', postsArray)
    } catch (e) {
      return context.error(e)
    }
  },

  setPosts(vuexContext, posts) {
    vuexContext.commit('SET_POST', posts)
  },

  async addPost(vuexContext, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date(),
    }
    try {
      const res = await this.$axios.$post(
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?auth=' +
          vuexContext.state.token,
        createdPost
      )
      vuexContext.commit('ADD_POST', { ...createdPost, id: res.name })
    } catch (e) {
      return console.log(e)
    }
  },

  async editPost(vuexContext, editedPost) {
    try {
      const res = await this.$axios.$put(
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/' +
          editedPost.id +
          '.json?auth=' +
          vuexContext.state.token,
        editedPost
      )
      console.log('🚀 ~ res', res)
      vuexContext.commit('EDIT_POST', editedPost)
    } catch (e) {
      return console.log(e)
    }
  },

  authenticateUser(vuexContext, authData) {
    let authUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      process.env.fbAPIKey
    if (!authData.isLogin) {
      authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        process.env.fbAPIKey
    }
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((res) => {
        console.log('res :>> ', res)
        vuexContext.commit('SET_TOKEN', res.idToken)
        localStorage.setItem('token', res.idToken)
        localStorage.setItem(
          'tokenExpiration',
          (
            new Date().getTime() +
            Number.parseInt(res.expiresIn) * 1000
          ).toString()
        )
        Cookie.set('jwt', res.idToken)
        Cookie.set(
          'expirationDate',
          (
            new Date().getTime() +
            Number.parseInt(res.expiresIn) * 1000
          ).toString()
        )
      })
      .catch((e) => {
        console.log('e :>> ', e)
      })
  },
  initAuth(vuexContext, req) {
    let token
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')!
    }
    if (new Date().getTime() > +expirationDate || !token) {
      console.log('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('SET_TOKEN', token)
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  },
}
