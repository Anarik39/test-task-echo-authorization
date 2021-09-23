<template>
  <v-app>
    <v-main>
      <v-container class="main-wrapper">
        <v-card elevation="2" outlined class="pa-5" max-width="450px" width="100%">
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
  height: 100%;
  max-width: 400px;
}
.v-card__title {
  word-break: normal !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
