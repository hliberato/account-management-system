<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 02-04-2018
-->

<template>
  <Container>
    <h1 class='md-title'>Management Logs</h1>
    <md-table>
      <md-table-row>
        <md-table-head>ID</md-table-head>
        <md-table-head>First Name</md-table-head>
        <md-table-head>Last Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row v-for="user in users" :key="user['.key']">
        <md-table-cell>{{ user['.key'] }}</md-table-cell>
        <md-table-cell>{{ user.firstName }}</md-table-cell>
        <md-table-cell>{{ user.lastName }}</md-table-cell>
        <md-table-cell>{{ user.email }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-primary">
            <md-icon>create</md-icon>
          </md-button>
          <md-button @click="removeUserDialog(user)" class="md-icon-button md-primary">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-button @click="$store.commit('showUserDialog')" class="md-fab md-plain md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
    <User></User>
    <md-dialog-confirm
      :md-active.sync="confirmRemoveDialog"
      md-title="Are you sure?"
      md-confirm-text="Remove"
      md-cancel-text="Cancel"
      @md-cancel="confirmRemoveDialog = false"
      @md-confirm="removeUser"/>
    <md-snackbar :md-active.sync="userRemoved" :md-duration="8000">
      The user {{ lastUserName }} was removed with success!
    </md-snackbar>
  </Container>
</template>

<script>
import Container from '@/components/Container.vue';
import User from '@/components/User.vue';

export default {
  name: 'Users',
  data: () => ({
    confirmRemoveDialog: false,
    userToRemove: null,
    lastUserName: null,
    userRemoved: false,
  }),
  firebase() {
    return {
      users: this.$root.db.ref('users'),
    };
  },
  components: {
    Container,
    User,
  },
  methods: {
    removeUserDialog(user) {
      this.userToRemove = user;
      this.confirmRemoveDialog = true;
    },
    removeUser() {
      this.$root.db.ref('users').child(this.userToRemove['.key']).remove();
      this.lastUserName = this.userToRemove.firstName;
      this.userRemoved = true;
      this.userToRemove = null;
    },
  },
};
</script>

<style>
  .md-table-head, .md-table-row{
    text-align: center;
  }
</style>
