<template>
  <v-expansion-panels>
    <v-expansion-panel title="Preview">
      <v-expansion-panel-text style="height: 500px">
        <iframe
          class="w-100 h-100"
          :src="pdfDownloadURL"
          frameborder="0"
        ></iframe>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrintPreview",
  props: {
    pdfDownloadURL: String,
  },
  data() {
    return {};
  },
});
</script>

<style scoped></style>
