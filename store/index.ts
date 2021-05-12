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
  ADD_POST: (state, post: object) => state.loadedPosts.push(post),
  EDIT_POST: (state, editedPost: any) => {
    const postIndex = state.loadedPosts.findIndex((post: any) => {
      return post.id === editedPost.id
    })
    state.loadedPosts[postIndex] = editedPost
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
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        createdPost
      )
      vuexContext.commit('ADD_POST', { ...createdPost, id: res.name })
    } catch (e) {
      return console.log(e)
    }
  },
  async editPost(vuexContext, editedPost) {
    try {
      const res = await axios.put(
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/' +
          editedPost.id +
          '.json',
        editedPost
      )
      console.log('🚀 ~ res', res)
      vuexContext.commit('EDIT_POST', editedPost)
    } catch (e) {
      return console.log(e)
    }
  },
}
