<template>
  <v-footer class="bg-cyan-3 text-center d-flex flex-column">
    <div class="pt-0">Datenschutz & Impressum</div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>GapBusters</strong></div>
  </v-footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "EmergencyContact",
  data() {
    return {};
  },
});
</script>

<style scoped></style>
