<!--
@Author: Henrique Liberato <hliberato>
@Date:   02-04-2018
@Last modified by:   hliberato
@Last modified time: 03-04-2018
-->
<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title v-if="!userToEdit">Create User</md-dialog-title>
      <md-dialog-title v-if="userToEdit">Edit User</md-dialog-title>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">First Name</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name"
                  v-model="form.firstName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.firstName.required">
                    The first name is required
                  </span>
                  <span class="md-error" v-else-if="!$v.form.firstName.minlength">
                    Invalid first name
                  </span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('lastName')">
                  <label for="last-name">Last Name</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name"
                  v-model="form.lastName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.lastName.required">
                    The last name is required
                  </span>
                  <span class="md-error" v-else-if="!$v.form.lastName.minlength">
                    Invalid last name
                  </span>
                </md-field>
              </div>
            </div>
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input type="email" name="email" id="email" autocomplete="email"
              v-model="form.email" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>
          </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
            <md-button class="md-accent" @click="showDialog = false">Close</md-button>
          </md-card-actions>
        </md-card>
        <md-snackbar :md-active.sync="userCreated" :md-duration="8000">
          The user {{ lastUser }} was created with success!
        </md-snackbar>
      </form>
    </md-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'User',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
    },
    userCreated: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
      return null;
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
    },
    createUser() {
      this.sending = true;

      this.$root.db.ref('users').push({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
      }, () => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userCreated = true;
        this.sending = false;
        this.$store.commit('hideUserDialog');
        this.clearForm();
      });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createUser();
      }
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.state.userDialog;
      },
      set(userDialog) {
        this.$store.state.userDialog = userDialog;
      },
    },
    userToEdit: {
      get() {
        return this.$store.state.userToEdit;
      },
      set(userToEdit) {
        this.$store.state.userToEdit = userToEdit;
      },
    },
  },
  watch: {
    userToEdit() {
      if (this.userToEdit) {
        this.form.firstName = this.userToEdit.firstName;
        this.form.lastName = this.userToEdit.lastName;
        this.form.email = this.userToEdit.email;
      } else {
        this.clearForm();
      }
    },
  },
};
</script>

<style scoped>
  .md-card{
    width: 500px !important;
  }
</style>
