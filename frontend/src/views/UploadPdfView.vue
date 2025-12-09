<template>
  <div class="px-5">
    <Upload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Upload from "../components/PdfUpload.vue";

export default defineComponent({
  name: "UploadPdfView",
  components: {
    Upload,
  },
});
</script>
