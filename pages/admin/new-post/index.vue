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
import axios from 'axios'

@Component({
  components: { AdminPostForm },
})
export default class NewPost extends Vue {
  layout() {
    return 'admin'
  }

  onSubmitted(postData: object) {
    axios
      .post(
        'https://nuxt-blog-9760b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        { ...postData, updatedDate: new Date() }
      )
      .then((result) => {
        console.log('result :>> ', result)
      })
      .catch((e) => {
        console.log('e :>> ', e)
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
