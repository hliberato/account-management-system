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
                <md-field :class="getValidationClass('name')">
                  <label for="fname">Name</label>
                  <md-input name="name" id="name" autocomplete="given-name"
                  v-model="form.name" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.name.required">
                    Name is required
                  </span>
                  <span class="md-error" v-else-if="!$v.form.name.minlength">
                    Invalid name
                  </span>
                </md-field>
                <md-field :class="getValidationClass('phone')">
                  <label for="phone">Phone</label>
                  <md-input name="phone" id="phone" autocomplete="family-name"
                  v-model="form.phone" :disabled="sending" type="number"/>
                  <span class="md-error" v-if="!$v.form.phone.required">
                    Phone is required
                  </span>
                  <span class="md-error" v-else-if="!$v.form.phone.minlength">
                    Invalid phone
                  </span>
                </md-field>
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
            <md-button v-if="!userToEdit" type="submit" class="md-primary" :disabled="sending">
              Create user
            </md-button>
            <md-button v-if="userToEdit" type="submit" class="md-primary" :disabled="sending">
              Edit user
            </md-button>
            <md-button class="md-accent" @click="showDialog = false">Close</md-button>
          </md-card-actions>
        </md-card>
        <md-snackbar :md-active.sync="userCreated" :md-duration="6000">
          The user {{ lastUser }} was created with success!
        </md-snackbar>
        <md-snackbar :md-active.sync="userEdited" :md-duration="6000">
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
      name: null,
      email: null,
      phone: null,
    },
    userCreated: false,
    userEdited: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(3),
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
      this.form.name = null;
      this.form.phone = null;
      this.form.email = null;
    },
    createUser() {
      this.sending = true;
      this.$root.db.ref('users').push({
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
      }, () => {
        this.lastUser = `${this.form.name}`;
        this.userCreated = true;
        this.sending = false;
        this.$store.commit('hideUserDialog');
        this.$root.db.ref('users_logs').push({
          name: this.form.name,
          email: this.form.email,
          action: 'create',
          timestamp: new Date().getTime(),
        }, () => {
          this.clearForm();
        });
      });
    },
    editUser() {
      this.sending = true;
      this.$root.db.ref('users').child(this.userToEdit['.key']).update({
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
      }, () => {
        this.lastUser = `${this.form.name}`;
        this.userEdited = true;
        this.sending = false;
        this.$store.commit('hideUserDialog');
        this.$root.db.ref('users_logs').push({
          name: this.form.name,
          email: this.form.email,
          action: 'update',
          timestamp: new Date().getTime(),
        }, () => {
          this.clearForm();
        });
      });
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.userToEdit) {
          this.editUser();
        } else {
          this.createUser();
        }
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
        this.form.name = this.userToEdit.name;
        this.form.phone = this.userToEdit.phone;
        this.form.email = this.userToEdit.email;
      } else {
        this.clearForm();
      }
    },
    showDialog() {
      if (!this.userToEdit) {
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
