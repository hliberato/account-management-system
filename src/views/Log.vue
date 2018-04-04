<!--
@Author: Henrique Liberato <hliberato>
@Date:   30-03-2018
@Last modified by:   hliberato
@Last modified time: 03-04-2018
-->

<template>
  <Container>
  <div class="logs">
    <h1 class="md-title">Logs</h1>
    <md-table v-model="logs" md-sort="name" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
        </div>

      </md-table-toolbar>
      <md-table-empty-state
        v-if="logs.length == 0"
        md-label="No log found"
        :md-description="`No log found for this '${search}' query.`">
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Action" md-sort-by="action">{{ item.action }}</md-table-cell>
        <md-table-cell md-label="When" md-sort-by="timestamp">
          {{ item.timestamp | formatDate }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</Container>
</template>

<script>
import Container from '@/components/Container.vue';

export default {
  name: 'Logs',
  components: {
    Container,
  },
  data: () => ({
    search: null,
    searched: [],
  }),
  firebase() {
    return {
      logs: this.$root.db.ref('users_logs'),
    };
  },
};
</script>

<style lang="scss">
  .logs {
    min-height: 100%;
    min-width: 100%;
    .md-field {
      max-width: 300px;
    }
  }
  .md-table-content{
    height: 100% !important;
    max-height: 100% !important;
    min-height: 100%;
  }
</style>
