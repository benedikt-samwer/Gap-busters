<template>
  <div class="px-5">
    <LoginForm class="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import LoginForm from "../components/LoginForm.vue";

export default defineComponent({
  name: "LoginView",

  components: {
    LoginForm,
  },
});
</script>
