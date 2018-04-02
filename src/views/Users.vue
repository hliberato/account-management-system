<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 02-04-2018
-->

<template>
  <Container>
    <div class="md-display-1">
      Users
    </div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Job Title</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>1</md-table-cell>
        <md-table-cell>Shawna Dubbin</md-table-cell>
        <md-table-cell>sdubbin0@geocities.com</md-table-cell>
        <md-table-cell>Assistant Media Planner</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button @click="$store.commit('showUserDialog')" class="md-fab md-plain md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
    <User></User>
  </Container>
</template>

<script>
import Container from '@/components/Container.vue';
import User from '@/components/User.vue';

export default {
  name: 'Users',
  data: () => ({
  }),
  components: {
    Container,
    User,
  },
};
</script>
