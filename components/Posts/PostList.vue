<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :is-admin="isAdmin"
      :thumbnail="post.thumbnail"
      :title="post.title"
      :preview-text="post.previewText"
    />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import PostPreview from '@/components/Posts/PostPreview.vue'

@Component({
  // omit the namespace argument ('myModule') if you are not using namespaced modules
  components: { PostPreview },
})
export default class PostList extends Vue {
  @Prop({ default: false }) isAdmin!: boolean
  @Prop({ required: true }) posts!: Array<object>
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
