<template>
  <div>
    <v-select
      label="Select your project"
      clearable
      :items="projectNames"
      variant="solo"
      v-model="selectedProjectName"
      class="rounded-0"
    ></v-select>
    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-expansion-panels v-if="pdfDownloadURL && !loading" v-model="panel">
      <v-expansion-panel title="Overview">
        <v-expansion-panel-text style="height: 500px">
          <iframe
            class="w-100 h-100"
            :src="pdfDownloadURLPreview"
            frameborder="0"
          ></iframe>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div style="position: fixed; left: 0; bottom: 0; width: 100%">
      <v-btn
        variant="tonal"
        size="x-large"
        :disabled="!selectedProjectName"
        elevation="20"
        class="rounding-0 py-3"
        style="width: 100%"
        @click="getProjectOverview"
      >
        Create Project Overview</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { getOverviewReport } from "@/api/getFilesApi";

// Components
// import PdfPreview from "../components/PrintPreview.vue";

declare interface projects {
  projectID: string;
  projectName: string;
}

export default defineComponent({
  name: "GetReportView",
  components: {
    // PdfPreview,
  },
  data() {
    return {
      projects: [] as projects[],
      projectNames: [],
      selectedProjectName: null,
      loading: false,
      pdfDownloadURL: null,
      panel: [0],
    };
  },
  computed: {
    pdfDownloadURLPreview() {
      console.log(
        "https://docs.google.com/viewerng/viewer?url=" +
          this.pdfDownloadURL +
          ".pdf" +
          "&output=embed"
      );
      return (
        "https://docs.google.com/viewerng/viewer?url=" +
        this.pdfDownloadURL +
        ".pdf" +
        "&output=embed"
      );
    },
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
  },
  methods: {
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
    async getProjectOverview() {
      this.loading = true;
      console.log(this.selectedProject.projectID);
      this.pdfDownloadURL = await getOverviewReport(
        this.selectedProject.projectID
      );
      this.loading = false;
    },
  },
  mounted() {
    //Test
    this.getProjects();
  },
});
</script>
