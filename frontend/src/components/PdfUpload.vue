<template>
  <v-card
    class="mx-auto px-sm-12 px-xs-3 pb-10 pt-10 my-xs-0 my-sm-15"
    :elevation="elevation"
    max-width="1080"
    rounded="lg"
  >
    <v-card-title align="center" class="pb-5">
      <div class="text-h4">Upload your PDF</div>
      <div class="text-h5 text-blue-grey-lighten-1">Step 1</div>
    </v-card-title>
    <v-card-text>
      <!-- <Preview class="mb-5" v-if="$store.getters.getPdfData" /> -->
      <v-form v-model="form" @submit.prevent="onUpload">
        <v-file-input
          :rules="[required]"
          accept=".pdf"
          label="File input"
          @change="previewImage"
          style="width: 100%"
          :loading="load"
          prepend-icon="mdi-file-pdf-box"
        ></v-file-input>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { pingPost } from "@/api/pingApi";
import { uploadPdf } from "@/api/uploadFilesApi";
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
      pdfData: null,
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
    previewImage(event: any) {
      this.$store.dispatch("deletePdfData");
      this.pdfData = event.target.files[0];
      this.onUpload();
    },
    async onUpload() {
      this.$store.dispatch("savePdfData", this.pdfData);
      console.log(this.pdfData);
    },
  },
});
</script>
