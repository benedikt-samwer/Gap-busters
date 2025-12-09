<template>
  <div class="px-5">
    <Upload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Upload from "../components/ImageUpload.vue";

export default defineComponent({
  name: "UploadImageView",
  components: {
    Upload,
  },
});
</script>
