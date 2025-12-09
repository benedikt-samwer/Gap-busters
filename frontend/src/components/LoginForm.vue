<template>
  <v-card
    class="mx-auto px-sm-12 px-xs-3 pb-10 pt-10 my-xs-0 my-sm-15"
    :elevation="elevation"
    max-width="448"
    rounded="lg"
  >
    <v-form v-model="form" @submit.prevent="login">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="login_form.email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        placeholder="Enter your email address"
        type="email"
        density="compact"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-if="!forgotPassword"
        v-model="login_form.password"
        :readonly="loading"
        :rules="[required]"
        clearable
        placeholder="Enter your password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

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
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <router-link class="text-blue text-decoration-none" to="/registration"
          >Sign up now <v-icon icon="mdi-chevron-right"></v-icon
        ></router-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const login_form = ref({});
    const store = useStore();
    const login = () => {
      // console.log(login_form.value);
      store.dispatch("login", login_form.value);
    };

    return {
      login_form,
      login,
    };
  },
  data() {
    return {
      form: false,
      loading: false,
      visible: false,
      forgotPassword: false,
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
    load() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 5000);
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
