<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
    >
      <v-list dense>
        <v-list-item link to="login">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="register">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
              class="d-flex fill-height"
              fluid
      >
        <v-snackbar
                v-model="snackbar"
        >
          {{ text }}
          <v-btn
                  color="pink"
                  text
                  @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <router-view class="d-flex flex-grow-1 fill-height"></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Weber Gang</span>
    </v-footer>
  </v-app>
</template>


<script>

export default {
  name: 'App',
  components: {
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    snackbar: false,
    text: 'Hello, I\'m a snackbar',
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
};
</script>
