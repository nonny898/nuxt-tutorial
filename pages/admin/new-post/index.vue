<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

@Component({
  components: { AdminPostForm },
  middleware: ['check-auth', 'auth'],
})
export default class NewPost extends Vue {
  layout() {
    return 'admin'
  }

  onSubmitted(postData: object) {
    this.$store.dispatch('addPost', postData).then(() => {
      this.$router.push('/admin')
    })
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
