<template>
  <div class="px-5">
    <Upload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Upload from "../components/PictureUpload.vue";

export default defineComponent({
  name: "UploadPictureView",
  components: {
    Upload,
  },
});
</script>
