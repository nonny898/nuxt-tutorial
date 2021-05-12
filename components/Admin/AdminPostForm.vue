<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">
      Thumbnail Link
    </AppControlInput>
    <AppControlInput v-model="editedPost.content" control-type="textarea">
      Content
    </AppControlInput>
    <AppControlInput v-model="editedPost.previewText" control-type="textarea">
      Preview Text
    </AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'nuxt-property-decorator'
import AppControlInput from '@/components/UI/AppControlInput.vue'
import AppButton from '@/components/UI/AppButton.vue'

@Component({
  // omit the namespace argument ('myModule') if you are not using namespaced modules
  components: { AppControlInput, AppButton },
})
export default class AdminPostForm extends Vue {
  @Prop({ required: false }) post!: object

  editedPost: object = this.post
    ? { ...this.post }
    : {
        author: '',
        title: '',
        thumbnail: '',
        content: '',
        previewText: '',
      }

  @Emit('submit')
  onSave() {
    // Save the post
    return this.editedPost
  }

  onCancel(): void {
    // Navigate back
    this.$router.push('/admin')
  }
}
</script>
