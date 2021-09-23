<template>
  <div>
    <v-card-title class="justify-center">Восстановление пароля</v-card-title>
    <forgot-password-start :callback="getDataSubmitPhone" v-if="!success" />
    <forgot-password-end v-if="success" :message="message" :phone="phone" />
    <div class="text-center mt-4">
      <v-btn to="/" plain color="teal">
        Вспомнил пароль!
      </v-btn>
      <v-btn to="/registration" plain color="teal" dark>
        Регистрация
      </v-btn>
    </div>
  </div>
</template>

<script>
import ForgotPasswordStart from "../components/ForgotPasswordStart.vue";
export default {
  name: "PageForgotPassword",
  components: {
    ForgotPasswordStart,
    ForgotPasswordEnd: () => import("../components/ForgotPasswordEnd.vue"),
  },

  data() {
    return {
      success: false,
      message: "",
      phone: "",
    };
  },

  methods: {
    getDataSubmitPhone(obj) {
      this.success = obj.data.success;
      this.message = obj.data.message;
      this.phone = obj.phone;
    },
  },
};
</script>
