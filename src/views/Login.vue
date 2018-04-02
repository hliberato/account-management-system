<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 02-04-2018
-->

<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-25 md-small-size-70 md-medium-size-50">
      <md-card-header>
        <div class="md-logo">
          <img src="../assets/logo.png">
        </div>
        <div class="md-title">Account Management System</div>
      </md-card-header>
      <md-card-content>
        <md-field md-clearable>
          <label>Email</label>
          <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <div class="md-error">
          {{error}}
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button @click="submitLogin" class="login-button md-raised md-primary">
          <label v-show="!submit">
            Login
          </label>
          <md-progress-spinner v-bind:class="{hidden: !submit}" class="md-accent" :md-diameter="20"
          :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    error: '',
    submit: false,
  }),
  methods: {
    submitLogin() {
      this.submit = true;
      const self = this;
      self.error = '';
      self.response = firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch((/* error */) => {
          self.error = 'Email não encontrado ou senha incorreta.';
          this.submit = false;
        });
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && this.submit) {
        this.$router.push('/');
      }
    });
  },
};
</script>
<style scoped>
  #app, .md-layout {
    min-height: 100%;
    min-width: 100%;
    position: absolute;
  }
  .md-card-actions{
    justify-content: center !important;
  }
  .login-button{
    width: 15rem;
    margin-bottom: 1rem !important;
  }
  circle{
    stroke: #fff !important;
  }
  .md-logo{
    text-align: center;
    padding: 16px 0;
  }
  .md-logo img{
    width: 96px;
  }
  .md-card-header{
    margin-bottom: 16px;
  }
  .md-error{
    color: #ff1744;
    text-align: center;
  }
  .hidden{
    display: none;
  }
</style>
