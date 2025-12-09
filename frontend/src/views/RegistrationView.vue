<template>
  <div class="px-5">
    <RegistrationForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import RegistrationForm from "../components/RegistrationForm.vue";

export default defineComponent({
  name: "RegistrationView",

  components: {
    RegistrationForm,
  },
});
</script>
