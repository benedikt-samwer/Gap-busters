<template>
  <v-card
    class="mx-auto px-sm-12 px-xs-3 pb-10 pt-10 my-xs-0 my-sm-15"
    :elevation="elevation"
    max-width="1080"
    rounded="lg"
  >
    <v-card-title align="center" class="pb-5"> Registration </v-card-title>
    <v-card-text>
      <v-form v-model="form" @submit.prevent="register">
        <div class="text-subtitle-1 text-medium-emphasis">E-Mail</div>
        <v-text-field
          v-model="register_form.email"
          :readonly="loading"
          :rules="[required]"
          required
          class="mb-2"
          clearable
          placeholder="Enter your email address"
          type="email"
          density="compact"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          v-model="register_form.password"
          :readonly="loading"
          :rules="[required]"
          clearable
          required
          placeholder="Enter your password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          color="blue"
          :rules="[required]"
          label="I agree to site terms and conditions"
        ></v-checkbox>

        <v-btn
          block
          class="mb-8"
          color="cyan-3"
          size="large"
          variant="elevated"
          :disabled="!form"
          :loading="loading"
          @click="load()"
          type="submit"
        >
          Register
        </v-btn>

        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="/login"
            >Already have an account? Log in now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";

export default defineComponent({
  name: "RegistrationForm",
  setup() {
    const register_form = ref({});
    const store = useStore();
    const register = () => {
      store.dispatch("register", register_form.value);
    };
    return {
      register_form,
      register,
    };
  },
  data() {
    return {
      form: false,
      loading: false,
      visible: false,
      terms: false,
      informationText: false,
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
    load() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 5000);
    },
    required(v: unknown) {
      return !!v || "Field is required";
    },
  },
});
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
