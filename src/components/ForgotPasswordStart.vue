<template>
  <form @submit.prevent="submit()">
    <v-alert v-if="errorSubmit.success === false" type="error">
      {{ errorSubmit.message }}
    </v-alert>
    <v-text-field
      color="teal"
      v-model="phone"
      :error-messages="phoneErrors"
      label="Телефон"
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
      v-mask="'+7(###)###-##-##'"
      :counter="16"
    ></v-text-field>
    <v-btn block color="teal" dark class="mb-2 mt-2" type="submit">
      Восстановить пароль
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "PageForgotPasswordStart",
  mixins: [validationMixin],

  props: {
    callback: Function,
  },

  data: () => ({
    phone: "",
    errorSubmit: {},
  }),

  validations: {
    phone: { required, minLength: minLength(16), maxLength: maxLength(16) },
  },

  computed: {
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      (!this.$v.phone.minLength || !this.$v.phone.maxLength) &&
        errors.push("Телефон введен некорректно");
      !this.$v.phone.required && errors.push("Телефон не указан");
      return errors;
    },
  },

  methods: {
    submit() {
      this.errorSubmit = {};
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store
        .dispatch("forgotPasswordStart", {
          phone: this.phone.replace(/[+()-]/g, ""),
        })
        .then((resp) => {
          localStorage.removeItem("phoneForgotPassword");
          this.callback({ data: resp.data, phone: this.phone.replace(/[+()-]/g, "") });
        })
        .catch((err) => {
          this.errorSubmit = err.data;
        });
    },
  },
  mounted() {
    if (localStorage.getItem("phoneForgotPassword")) {
      this.phone = localStorage.getItem("phoneForgotPassword");
    }
  },
  watch: {
    phone(newPhone) {
      localStorage.setItem("phoneForgotPassword", newPhone);
    },
  },
};
</script>
