import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from 'axios'

export const state = () => ({
  loadedPosts: [] as object[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  loadedPosts: (state) => state.loadedPosts,
}

export const mutations: MutationTree<RootState> = {
  SET_POST: (state, posts: object[]) => (state.loadedPosts = posts),
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get(
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
      )
      .then((red) => {
        const postsArray = []
        for (const key in red.data) {
          postsArray.push({ ...red.data[key], id: key })
        }
        vuexContext.commit('SET_POST', postsArray)
      })
      .catch((e) => context.error(e))
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     vuexContext.commit('SET_POST', [
    //       {
    //         id: '1',
    //         title: 'First Post',
    //         previewText: 'This is our first post!',
    //         thumbnail:
    //           'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    //       },
    //       {
    //         id: '2',
    //         title: 'Second Post',
    //         previewText: 'This is our second post!',
    //         thumbnail:
    //           'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    //       },
    //     ])
    //     resolve()
    //   }, 1000)
    // })
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('SET_POST', posts)
  },
}
