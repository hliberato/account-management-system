<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 03-04-2018
-->

<template>
  <Container>
    <h1 class='md-title'>Users Management</h1>
    <md-table>
      <md-table-row>
        <md-table-head>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Phone</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row v-for="user in users" :key="user['.key']">
        <md-table-cell>{{ user['.key'] }}</md-table-cell>
        <md-table-cell>{{ user.name }}</md-table-cell>
        <md-table-cell>{{ user.phone }}</md-table-cell>
        <md-table-cell>{{ user.email }}</md-table-cell>
        <md-table-cell>
          <md-button @click="$store.commit('showEditUserDialog', user);"
          class="md-icon-button md-primary">
            <md-icon>create</md-icon>
          </md-button>
          <md-button @click="removeUserDialog(user)" class="md-icon-button md-primary">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-button @click="$store.commit('showCreateUserDialog');"
    class="md-fab md-plain md-fab-bottom-right">
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
      The user {{ userName }} was removed with success!
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
    userName: null,
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
      this.userName = this.userToRemove.name;
      this.userRemoved = true;
      this.$root.db.ref('users_logs').push({
        name: this.userToRemove.name,
        email: this.userToRemove.email,
        action: 'delete',
        timestamp: new Date().getTime(),
      }, () => {
        this.userToRemove = null;
      });
    },
  },
};
</script>

<style>
  .md-table-head, .md-table-row{
    text-align: center;
  }
</style>
