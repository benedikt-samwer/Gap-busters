<template>
  <nav>
    <v-toolbar flat outlined color="cyan-3">
      <v-app-bar-nav-icon @click="showMenu = !showMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span> GapBusters</span>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn icon @click="$store.dispatch('logout')">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      style="position: fixed"
      class="bg-cyan-3"
      absolute
      temporary
      v-model="showMenu"
    >
      <v-list>
        <v-list-item :title="userEmail">
          <template v-slot:prepend>
            <v-avatar icon="mdi-account" class="bg-white text-cyan-3">
            </v-avatar> </template
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="link in links()"
          :key="link.text"
          router
          :to="link.route"
          :title="link.text"
          :prepend-icon="link.icon"
        >
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <!-- <v-btn
            class="bg-white text-cyan-3"
            block
            @click="$store.dispatch('logout')"
          >
            Logout
            <v-icon>mdi-export</v-icon>
          </v-btn> -->
          <v-list-item
            router
            @click="$store.dispatch('logout')"
            title="Logout"
            prepend-icon="mdi-export"
          >
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarGenerall",

  data() {
    return {
      showMenu: false,
      links: () => {
        const user = this.$store.getters.getUser !== null;
        if (user) {
          return [
            {
              icon: "mdi-upload",
              text: "Create Report",
              route: "/createreport",
            },
            {
              icon: "mdi-printer",
              text: "Create Overview",
              route: "/getreport",
            },
          ];
        } else {
          return [
            { icon: "mdi-login", text: "Log in", route: "/login" },
            {
              icon: "mdi-account-outline",
              text: "Register",
              route: "/registration",
            },
          ];
        }
      },
    };
  },
  computed: {
    userInitials() {
      return this.$store.getters.getUser.email[0].toString().toUpper();
    },
    userEmail() {
      if (this.$store.getters.getUser) {
        return this.$store.getters.getUser.email;
      } else {
        return "-";
      }
    },
  },
});
</script>
