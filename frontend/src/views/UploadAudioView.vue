<template>
  <div class="px-5">
    <Upload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Upload from "../components/AudioUpload.vue";

export default defineComponent({
  name: "UploadAudioView.vue",
  components: {
    Upload,
  },
});
</script>
