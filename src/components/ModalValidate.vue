<template>
  <modal title="Modal with form" @close="onClose">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="form-item" :class="{ errorInput: $v.name.$error }">
          <label>Name:</label>
          <p class="error-text" v-if="!$v.name.required">Filed is required</p>
          <p class="error-text" v-if="!$v.name.minLength">
            Name must have at least {{ $v.name.$params.minLength.min }} !
          </p>
          <input
            v-model="name"
            :class="{ error: $v.name.$error }"
            @change="$v.name.$touch()"
          />
        </div>

        <div class="form-item" :class="{ errorInput: $v.password.$error }">
          <label>Password:</label>
          <p class="error-text" v-if="!$v.password.required">
            Filed is required!
          </p>
          <input
            v-model="password"
            :class="{ error: $v.password.$error }"
            @change="$v.password.$touch()"
          />
        </div>

        <div
          class="form-item"
          :class="{ errorInput: $v.repeatPassword.$error }"
        >
          <label>Repeat password:</label>
          <p class="error-text" v-if="!$v.repeatPassword.required">
            Filed is required!
          </p>
          <p class="error-text" v-if="!$v.repeatPassword.sameAsPassword">
            Passwords must be identical!
          </p>
          <input
            v-model="repeatPassword"
            :class="{ error: $v.repeatPassword.$error }"
            @change="$v.repeatPassword.$touch()"
          />
        </div>

        <div class="form-item" :class="{ errorInput: $v.email.$error }">
          <label>Email:</label>
          <p class="error-text" v-if="!$v.email.required">Filed is required</p>
          <p class="error-text" v-if="!$v.email.email">
            Email is not correct !
          </p>
          <input
            v-model="email"
            :class="{ error: $v.email.$error }"
            @change="$v.email.$touch()"
          />
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import modal from "@/components/UI/Modal.vue";

export default {
  components: {
    modal,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
    },
    repeatPassword: {
      required,
      sameAsPassword() {
        return this.repeatPassword === this.password;
      },
    },
  },
  methods: {
    onClose() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.$v.$reset();
      this.$emit("close");
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          name: this.name,
          email: this.email,
        };
        console.log(user);
        this.name = "";
        this.email = "";
        this.password = "";
        this.repeatPassword = "";
        this.$v.$reset();
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss">
.form-item .error-text {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: red;
}
.form-item {
  &.errorInput .error-text {
    display: block;
  }
}

input.error {
  border-color: red;
}
</style>