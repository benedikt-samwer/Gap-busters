<template>
  <div class="px-5">
    <Upload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Upload from "../components/MemoUpload.vue";

export default defineComponent({
  name: "UploadMemoView",
  components: {
    Upload,
  },
});
</script>
