<template>
  <div>
    <v-form v-model="form" @submit.prevent="onUpload">
      <v-select
        label="Select your project"
        clearable
        :items="projectNames"
        variant="solo"
        v-model="selectedProjectName"
        class="rounded-0"
        :rules="[required]"
      ></v-select>
      <div
        v-if="
          !pdfUpload &&
          !audioUpload &&
          !imageUpload &&
          !pictureUpload &&
          !memoUpload
        "
      >
        <div class="px-3" v-for="index in submitScore" :key="index">
          <v-row
            class="rounded-0 px-5 py-5 d-flex flex-nowrap justify-end align-center"
          >
            <v-chip append-icon="mdi-account"> Report submitted! </v-chip>
          </v-row>
          <v-row
            class="rounded-0 px-5 py-5 d-flex flex-nowrap justify-start align-center"
          >
            <v-chip prepend-icon="mdi-office-building">
              Report recieved!
            </v-chip>
          </v-row>
        </div>
      </div>
      <div v-if="pdfUpload">
        <v-card class="mx-auto px-3 pb-10 pt-10 my-0" elevation="0">
          <v-card-title align="center" class="pb-5">
            <div class="text-h4">Upload your PDF</div>
          </v-card-title>
          <v-card-text>
            <v-file-input
              :rules="[required]"
              accept="application/pdf"
              label="File input"
              @change="changeOfInput"
              style="width: 100%"
              :loading="load"
              prepend-icon="mdi-file-pdf-box"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="audioUpload">
        <v-card class="mx-auto px-3 pb-10 pt-10 my-0" elevation="0">
          <v-card-title align="center" class="pb-5">
            <div class="text-h4">Upload your Audio</div>
          </v-card-title>
          <v-card-text>
            <v-file-input
              :rules="[required]"
              accept="audio/wav"
              label="File input"
              @change="changeOfInput"
              style="width: 100%"
              :loading="load"
              prepend-icon="mdi-music-box-outline"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="imageUpload">
        <v-card class="mx-auto px-3 pb-10 pt-10 my-0" elevation="0">
          <v-card-title align="center" class="pb-5">
            <div class="text-h4">Upload your Image</div>
          </v-card-title>
          <v-card-text>
            <v-file-input
              :rules="[required]"
              accept="image/jpeg, image/png"
              label="File input"
              @change="changeOfInput"
              style="width: 100%"
              :loading="load"
              prepend-icon="mdi-image-outline"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="pictureUpload">
        <v-card class="mx-auto px-3 pb-10 pt-10 my-0" elevation="0">
          <v-card-title align="center" class="pb-5">
            <div class="text-h4">Upload your Image</div>
          </v-card-title>
          <v-card-text>
            <v-btn type="button" class="mx-auto" @click="toggleCamera">
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
            <div v-if="isCameraOpen" v-show="!isLoading" class="mx-auto">
              <video
                v-show="!isPhotoTaken"
                ref="camera"
                :width="cameraResX"
                :height="cameraResY"
                autoplay
              ></video>
              <canvas
                v-show="isPhotoTaken"
                id="photoTaken"
                ref="canvas"
                :width="cameraResX"
                :height="cameraResY"
              ></canvas>
            </div>
            <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
              <v-btn
                @click="takePhoto"
                prepend-icon="mdi-camera-outline"
                stacked
                >Smile ;)
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="memoUpload">
        <v-card class="mx-auto px-3 pb-10 pt-10 my-0" elevation="0">
          <v-card-title align="center" class="pb-5">
            <div class="text-h4">Upload your Image</div>
          </v-card-title>
          <v-card-text>
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
            >
              <template v-slot:prepend>
                <v-icon color="red"></v-icon>
              </template>
              Stop Recording</v-btn
            >

            <br />

            <audio
              v-if="newAudio"
              :src="newAudioURL"
              controls
              class="mx-2 my-2"
            ></audio>
          </v-card-text>
        </v-card>
      </div>

      <v-card
        style="position: fixed; left: 0; bottom: 0; width: 100%"
        elevation="6"
      >
        <div
          v-if="
            !pdfUpload &&
            !audioUpload &&
            !imageUpload &&
            !pictureUpload &&
            !memoUpload
          "
          class="rounded-0 px-3 py-2 d-flex flex-nowrap justify-space-around bg-white"
        >
          <v-btn
            icon="mdi-file-pdf-box"
            @click="pdfUpload = !pdfUpload"
          ></v-btn>
          <v-btn
            icon="mdi-music-box-outline"
            @click="audioUpload = !audioUpload"
          ></v-btn>
          <v-btn
            icon="mdi-image-outline"
            @click="imageUpload = !imageUpload"
          ></v-btn>
          <v-btn
            @click="
              () => {
                pictureUpload = !pictureUpload;
                toggleCamera();
              }
            "
            icon="mdi-camera-outline"
          ></v-btn>
        </div>
        <v-card
          v-if="
            !pdfUpload &&
            !audioUpload &&
            !imageUpload &&
            !pictureUpload &&
            !memoUpload
          "
          class="rounded-0 px-3 py-2 d-flex flex-nowrap align-center"
        >
          <v-textarea
            rows="1"
            clearable
            clear-icon="mdi-close-circle"
            label="What you always wanted to say..."
            :loading="load"
            auto-grow
            v-model="textData"
            variant="solo"
            prepend-inner-icon="mdi-text-box-edit-outline"
            class="rounded-pill mr-2 flex-grow-1 flex-shrink-0"
            hide-details
          ></v-textarea>
          <v-btn
            @click="memoUpload = !memoUpload"
            icon="mdi-microphone-outline"
            class="mr-2"
          ></v-btn>
          <v-btn
            :disabled="!selectedProjectName"
            @click="onTextUpload"
            icon="mdi-send-variant-outline"
          ></v-btn>
        </v-card>
        <div
          v-if="
            pdfUpload ||
            audioUpload ||
            imageUpload ||
            pictureUpload ||
            memoUpload
          "
          class="rounded-0 px-3 py-2 d-flex flex-nowrap justify-space-around align-center"
        >
          <v-btn
            @click="
              () => {
                reset();
                uploadData = null;
                $store.dispatch('deletePdfData');
                if (isCameraOpen) {
                  isCameraOpen = false;
                  isPhotoTaken = false;
                  isShotPhoto = false;
                  stopCameraStream();
                }
              }
            "
            icon="mdi-delete-outline"
            class="mr-2"
          ></v-btn>
          <v-btn
            :disabled="
              !(selectedProjectName && (!pictureUpload || isPhotoTaken))
            "
            @click="onUpload"
            icon="mdi-send-variant-outline"
          ></v-btn>
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useDisplay } from "vuetify";

import {
  uploadPdf,
  uploadText,
  uploadAudio,
  uploadImage,
  uploadImage64,
} from "@/api/uploadFilesApi";

import { WavRecorder, getWaveBlob } from "webm-to-wav-converter";

// import PdfUpload from "../components/PdfUpload.vue";

// Components
declare interface projects {
  projectID: string;
  projectName: string;
}

export default defineComponent({
  name: "CreateReportView",
  components: {
    // PdfUpload,
  },
  data() {
    return {
      projects: [] as projects[],
      projectNames: [],
      selectedProjectName: null,
      form: false,
      load: false,
      textData: null,
      uploadData: null,
      pdfUpload: false,
      imageUpload: false,
      audioUpload: false,
      pictureUpload: false,
      memoUpload: false,
      cameraResX: 300,
      cameraResY: 225,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: "#",
      newAudio: null,
      recorder: null,
      succesMessage: false,
      submitScore: 0,
    };
  },
  computed: {
    selectedProject() {
      var project: projects = null;
      this.projects.forEach((element) => {
        const e: string = element.projectName;
        const selectedProjectName: string = this.selectedProjectName;
        if (e.localeCompare(selectedProjectName) == 0) {
          project = element;
        }
      });
      return project;
    },
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
    changeOfInput(event: any) {
      this.$store.dispatch("deletePdfData");
      this.uploadData = event.target.files[0];
      console.log(this.uploadData);
      this.$store.dispatch("savePdfData", this.uploadData);
    },
    required(v: unknown) {
      return !!v || "Field is required";
    },
    reset() {
      this.pdfUpload = false;
      this.imageUpload = false;
      this.audioUpload = false;
      this.pictureUpload = false;
      this.memoUpload = false;
    },
    async onUpload() {
      this.$store.dispatch("savePdfData", this.uploadData);
      this.succesNotification();
      const proj = this.selectedProject;

      console.log(proj);
      if (this.audioUpload || this.memoUpload) {
        await uploadAudio(this.uploadData, proj.projectID);
      } else if (this.imageUpload) {
        console.log(this.uploadData);
        await uploadImage(this.uploadData, proj.projectID);
      } else if (this.pictureUpload) {
        await uploadImage64(this.uploadData, proj.projectID);
      } else {
        await uploadPdf(this.uploadData, proj.projectID);
      }
      this.reset();
    },
    async onTextUpload() {
      this.uploadData = this.textData;
      this.$store.dispatch("savePdfData", this.uploadData);
      this.succesNotification();
      const proj = this.selectedProject;
      await uploadText(this.uploadData, proj.projectID);
      this.reset();
    },
    succesNotification() {
      this.submitScore++;
    },
    async getProjects() {
      const q = query(collection(db, "projects"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        var orderData: projects = {
          projectID: doc.id,
          projectName: doc.data().projectName,
        };
        this.projectNames.push(orderData.projectName);
        this.projects.push(orderData);
      });
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
      context.drawImage(
        this.$refs.camera,
        0,
        0,
        this.cameraResX,
        this.cameraResY
      );
      console.log("test");
      this.downloadImage();
    },

    downloadImage() {
      this.uploadData = (
        document.getElementById("photoTaken") as HTMLCanvasElement
      ).toDataURL("image/jpeg");
      this.$store.dispatch("savePdfData", this.uploadData);
    },
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

      this.recorder.addEventListener("stop", async () => {
        var blob = await getWaveBlob(recordedChunks, false);
        const myFile = new File([blob], "audio.wav", {
          type: "audio/wav",
        });
        this.uploadData = myFile;
        this.$store.dispatch("savePdfData", this.uploadData);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
  mounted() {
    //Test
    this.getProjects();
  },
});
</script>
