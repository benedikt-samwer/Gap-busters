<template>
  <v-card
    class="mx-auto px-sm-12 px-xs-3 pb-10 pt-10 my-xs-0 my-sm-15"
    :elevation="elevation"
    max-width="1080"
    rounded="lg"
  >
    <v-card-title align="center" class="pb-5">
      <div class="text-h4">Create a Memo</div>
      <div class="text-h5 text-blue-grey-lighten-1">Step 1</div>
    </v-card-title>
    <v-card-text>
      <!-- <Preview class="mb-5" v-if="$store.getters.getPdfData" /> -->
      <v-form v-model="form" @submit.prevent="onUpload">
        <v-btn
          v-if="!recorder"
          @click="record()"
          class="mx-2 my-2"
          prepend-icon="mdi-microphone-outline"
          stacked
          width="350"
          height="350"
        >
          Start Recording
        </v-btn>

        <v-btn
          v-else
          @click="stop()"
          class="mx-2 my-2"
          prepend-icon="mdi-record-circle-outline"
          stacked
          width="350"
          height="350"
          >Stop Recording</v-btn
        >

        <br />

        <audio
          v-if="newAudio"
          :src="newAudioURL"
          controls
          class="mx-2 my-2"
        ></audio>
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
      load: false,
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
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
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  methods: {
    async record() {
      this.$store.dispatch("deletePdfData");
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks: any[] = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        this.onUpload();
        console.log(this.newAudio);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
    required(v: unknown) {
      return !!v || "Field is required";
    },
    onUpload() {
      this.$store.dispatch("savePdfData", this.newAudio);
      console.log(this.newAudio);
    },
  },
});
</script>
