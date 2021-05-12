<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PostList from '@/components/Posts/PostList.vue'

@Component({
  // omit the namespace argument ('myModule') if you are not using namespaced modules
  components: { PostList },
})
export default class Posts extends Vue {
  get loadedPosts() {
    return this.$store.getters.loadedPosts
  }
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
