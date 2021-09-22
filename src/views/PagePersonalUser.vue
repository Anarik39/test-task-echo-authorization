<template>
  <div>
    <v-card-title>{{ title }}</v-card-title>
    <v-btn @click="logOutOfProfile" block color="teal" dark class="mt-4">
      Выход
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "PagePersonalUser",
  data() {
    return {
      title: "",
      token: "",
    };
  },
  props: {
    data: Object,
  },
  methods: {
    logOutOfProfile() {
      localStorage.clear();
      this.$router.push({
        name: "Authorization",
      });
    },
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  mounted() {
    axios
      .get("https://backend-front-test.dev.echo-company.ru/api/user", {
        headers: {
          Authorization: this.getToken,
        },
      })
      .then(
        (response) =>
          (this.title = `Здравствуйте, ${response.data.first_name} ${response.data.last_name}!`)
      )
      .catch(() => (this.title = "Не авторизован"));
  },
};
</script>
