<template>
  <v-card
    class="mx-auto px-sm-12 px-xs-3 pb-10 pt-10 my-xs-0 my-sm-15"
    :elevation="elevation"
    max-width="1080"
    rounded="lg"
  >
    <v-card-title align="center" class="pb-5">
      <div class="text-h4">Upload your Picture</div>
      <div class="text-h5 text-blue-grey-lighten-1">Step 1</div>
    </v-card-title>
    <v-card-text>
      <v-form v-model="form" @submit.prevent="onUpload">
        <v-btn type="button" class="mx-2 my-2" @click="toggleCamera">
          <span v-if="!isCameraOpen">Open Camera</span>
          <span v-else>Close Camera</span>
        </v-btn>

        <div v-show="isCameraOpen && isLoading" class="camera-loading">
          <ul class="loader-circle">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div v-if="isCameraOpen" v-show="!isLoading" class="mx-2 my-2">
          <video
            v-show="!isPhotoTaken"
            ref="camera"
            :width="450"
            :height="337.5"
            autoplay
          ></video>

          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            :width="450"
            :height="337.5"
          ></canvas>
        </div>

        <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
          <v-btn
            type="tonal"
            @click="takePhoto"
            prepend-icon="mdi-camera-outline"
            stacked
            class="mx-2 my-2"
          >
            Take Picture
          </v-btn>
        </div>
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
          :disabled="!$store.getters.getPdfData"
          color="cyan-3"
          elevation="5"
          to="/order-step-2"
          width="130"
          >Continue</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDisplay } from "vuetify";

export default defineComponent({
  name: "PrintUpload",
  components: {},
  data() {
    return {
      form: false,
      pdfData: null,
      load: false,
      isCameraOpen: true,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: "#",
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
    onUpload() {
      this.$store.dispatch("savePdfData", this.pdfData);
      console.log(this.pdfData);
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = ((window as any).constraints = {
        audio: false,
        video: true,
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          this.isLoading = false;
          alert("May the browser didn't support or there is some errors.");
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
      console.log("test");
      this.downloadImage();
    },

    downloadImage() {
      this.pdfData = (
        document.getElementById("photoTaken") as HTMLCanvasElement
      ).toDataURL("image/jpeg");
      this.onUpload();
    },
  },
  mounted() {
    this.createCameraElement();
  },
});
</script>
