<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

@Component({
  // omit the namespace argument ('myModule') if you are not using namespaced modules
  components: { AdminPostForm },
  middleware: ['check-auth', 'auth'],
})
export default class PostList extends Vue {
  layout() {
    return 'admin'
  }

  async asyncData(context: {
    app: { $axios: { $get: (arg0: string) => any } }
    params: { postId: string }
    error: () => any
  }) {
    try {
      const res = await context.app.$axios.$get(
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/' +
          context.params.postId +
          '.json'
      )
      console.log('🚀 ~ res', res)
      return {
        loadedPost: { ...res, id: context.params.postId },
      }
    } catch (e) {
      return context.error()
    }
  }

  onSubmitted(editedPost: object) {
    this.$store.dispatch('editPost', editedPost).then(() => {
      this.$router.push('/admin')
    })
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
