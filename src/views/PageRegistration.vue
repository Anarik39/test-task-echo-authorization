<template>
  <form @submit.prevent="submit()">
    <v-card-title class="justify-center">Регистрация</v-card-title>
    <v-alert v-if="errorSubmit.success === false" type="error">
      {{ errorSubmit.message }}
    </v-alert>
    <v-text-field
      color="teal"
      v-model="firstName"
      :error-messages="firstNameErrors"
      label="Имя"
      @input="$v.firstName.$touch()"
      @blur="$v.firstName.$touch()"
    ></v-text-field>
    <v-text-field
      color="teal"
      v-model="lastName"
      :error-messages="lastNameErrors"
      label="Фамилия"
      @input="$v.lastName.$touch()"
      @blur="$v.lastName.$touch()"
    ></v-text-field>
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
    <v-text-field
      color="teal"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      v-model="password"
      :error-messages="passwordErrors"
      label="Пароль"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-file-input
      class="mt-2"
      v-model="image"
      color="teal"
      append-icon="mdi-camera"
      prepend-icon=""
      filled
      dense
      accept="image/png, image/jpeg, image/bmp"
      label="Аватар"
    ></v-file-input>
    <v-btn block color="teal" dark class="mt-2" type="submit">
      Зарегистрироваться
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "PageRegistration",
  mixins: [validationMixin],

  data: () => ({
    image: null,
    showPassword: false,
    phone: "",
    password: "",
    firstName: "",
    lastName: "",
    errorSubmit: {},
  }),

  validations: {
    firstName: { required },
    lastName: { required },
    phone: { required, minLength: minLength(16), maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
  },

  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("Имя не указано");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Фамилия не указана");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      (!this.$v.phone.minLength || !this.$v.phone.maxLength) &&
        errors.push("Телефон введен некорректно");
      !this.$v.phone.required && errors.push("Телефон не указан");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Пароль должен содержать не менее 8 символов");
      !this.$v.password.required && errors.push("Пароль не указан");
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
      const data = {
        phone: this.phone.replace(/[+()-]/g, ""),
        password: this.password,
        first_name: this.firstName,
        last_name: this.lastName,
      };

      this.$store
        .dispatch("registration", data)
        .then(() => {
          localStorage.removeItem("firstNameRegistration");
          localStorage.removeItem("lastNameRegistration");
          localStorage.removeItem("phoneRegistration");
          this.$router.push({
            name: "User",
          });
        })
        .catch((err) => {
          this.errorSubmit = err.data;
        });
    },
  },
  mounted() {
    if (localStorage.getItem("firstNameRegistration")) {
      this.firstName = localStorage.getItem("firstNameRegistration");
    }
    if (localStorage.getItem("lastNameRegistration")) {
      this.lastName = localStorage.getItem("lastNameRegistration");
    }
    if (localStorage.getItem("phoneRegistration")) {
      this.phone = localStorage.getItem("phoneRegistration");
    }
  },
  watch: {
    firstName(newFirstName) {
      localStorage.setItem("firstNameRegistration", newFirstName);
    },
    lastName(newLastName) {
      localStorage.setItem("lastNameRegistration", newLastName);
    },
    phone(newPhone) {
      localStorage.setItem("phoneRegistration", newPhone);
    },
  },
};
</script>
