<!--
@Author: Henrique Liberato <hliberato>
@Date:   30-03-2018
@Last modified by:   hliberato
@Last modified time: 02-04-2018
-->

<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Account Management System</span>
        </div>
        <div class="md-toolbar-section-end">
          <md-button @click="signOut()" class="md-icon-button">
            <md-icon>exit_to_app</md-icon>
          </md-button>
        </div>
      </div>
    </md-app-toolbar>
    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>
      <md-list>
        <md-list-item to="/" @click="menuVisible = !menuVisible">
          <md-icon class="md-primary">supervisor_account</md-icon>
          <span class="md-list-item-text">Users</span>
        </md-list-item>
        <md-list-item to="/logs" @click="menuVisible = !menuVisible">
          <md-icon class="md-primary">list</md-icon>
          <span class="md-list-item-text">Logs</span>
        </md-list-item>
        <md-list-item to="/about" @click="menuVisible = !menuVisible">
          <md-icon class="md-primary">info_outline</md-icon>
          <span class="md-list-item-text">About</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>
    <md-app-content>
      <slot></slot>
    </md-app-content>
  </md-app>
</template>

<script type="text/javascript">
import firebase from 'firebase';

export default {
  name: 'Container',
  data: () => ({
    menuVisible: false,
    username: '',
  }),
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push('/login');
    },
  },
  mounted() {
    const name = firebase.auth().currentUser.email;
    this.username = name;
  },
};
</script>

<style scoped>
  #app {
    text-align: center;
  }
  #app, .md-app {
    min-height: 100%;
    min-width: 100%;
    position: absolute;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
