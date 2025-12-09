<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { ping } from "./api/pingApi";
import { uploadText } from "./api/uploadFilesApi";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style></style>
