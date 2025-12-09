<template>
  <v-card
    class="mx-auto px-sm-12 px-xs-3 pb-10 pt-10 my-xs-0 my-sm-15"
    :elevation="elevation"
    max-width="1080"
    rounded="lg"
  >
    <v-card-title align="center" class="pb-5">
      <div class="text-h4">Upload your Text</div>
      <div class="text-h5 text-blue-grey-lighten-1">Step 1</div>
    </v-card-title>
    <v-card-text>
      <!-- <Preview class="mb-5" v-if="$store.getters.getPdfData" /> -->
      <v-form v-model="form" @submit.prevent="onUpload">
        <v-textarea
          clearable
          clear-icon="mdi-close-circle"
          :rules="[required]"
          label="Text input"
          style="width: 100%"
          :loading="load"
          prepend-icon="mdi-text-box-edit-outline"
          auto-grow
          v-model="pdfData"
        ></v-textarea>
      </v-form>
      <div class="d-flex justify-center mt-5">
        <v-btn variant="text" to="/createreport" width="130" outlined
          >Back</v-btn
        >
        <v-spacer> </v-spacer>
        <v-btn
          variant="text"
          color="red"
          to="/"
          @click="$store.dispatch('deletePdfData')"
          width="130"
          >Cancel</v-btn
        >
        <v-spacer> </v-spacer>
        <v-btn
          color="cyan-3"
          elevation="5"
          to="/order-step-2"
          width="130"
          @click="onUpload()"
          >Continue</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { uploadText } from "@/api/uploadFilesApi";
import { defineComponent } from "vue";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { v4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import pdfJSWorker from "pdfjs-dist/build/pdf.worker.entry";

// import Preview from "./PrintPreview.vue";
import { useDisplay } from "vuetify";

export default defineComponent({
  name: "PrintUpload",
  components: {
    // Preview,
  },
  data() {
    return {
      form: false,
      pdfData: "",
      load: false,
    };
  },
  computed: {
    elevation(): number {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return 0;
        default:
          return 8;
      }
    },
  },
  methods: {
    required(v: unknown) {
      return !!v || "Field is required";
    },
    async onUpload() {
      this.$store.dispatch("savePdfData", this.pdfData);
    },
  },
});
</script>
