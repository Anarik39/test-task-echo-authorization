<template>
  <div>
    <form @submit.prevent="submit()">
      <v-alert v-if="errorSubmit.success === false" type="error">
        {{ errorSubmit.message }}
      </v-alert>
      <v-text-field
        color="teal"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        v-model="password"
        :error-messages="passwordErrors"
        label="Новый пароль"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-alert type="success">
        {{ message }}
      </v-alert>
      <v-text-field
        color="teal"
        v-model="sms"
        :error-messages="smsErrors"
        label="Код из СМС"
        @input="$v.sms.$touch()"
        @blur="$v.sms.$touch()"
      ></v-text-field>
      <v-btn block color="teal" dark class="mb-2 mt-2" type="submit">
        Подтвердить
      </v-btn>
      <v-dialog persistent v-model="modalDisplay.show" max-width="300px">
        <v-card>
          <v-card-title
            class="text-center justify-center pa-4 teal white--text"
          >
            {{ modalDisplay.message }}
          </v-card-title>
          <v-progress-linear
            background-color="teal"
            indeterminate
            color="white"
          ></v-progress-linear>
        </v-card>
      </v-dialog>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ForgotPasswordEnd",
  mixins: [validationMixin],

  props: {
    message: String,
    phone: String
  },

  data() {
    return {
      password: "",
      showPassword: false,
      errorSubmit: {},
      sms: "",
      modalDisplay: {
        show: false,
        message: ""
      }
    };
  },

  validations: {
    password: { required, minLength: minLength(8) },
    sms: { required }
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Пароль должен содержать не менее 8 символов");
      !this.$v.password.required && errors.push("Пароль не указан");
      return errors;
    },
    smsErrors() {
      const errors = [];
      if (!this.$v.sms.$dirty) return errors;
      !this.$v.sms.required && errors.push("Код из СМС не указан");
      return errors;
    }
  },
  methods: {
    submit() {
      this.errorSubmit = {};
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const data = {
        phone: this.phone,
        code: this.sms,
        password: this.password
      };
      this.$store
        .dispatch("profile/forgotPasswordEnd", data)
        .then(resp => {
          this.modalDisplay = {
            show: resp.success,
            message: resp.message
          };
          setTimeout(
            () =>
              this.$router.push({
                name: "User"
              }),
            2000
          );
        })
        .catch(err => {
          this.errorSubmit = err.data;
        });
    }
  }
};
</script>
