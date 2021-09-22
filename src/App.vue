<template>
  <v-app>
    <v-main>
      <v-container class="main-wrapper">
        <v-card elevation="2" outlined class="pa-5">
          <router-view />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 400px;
}
</style>
