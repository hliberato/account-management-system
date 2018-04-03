<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 03-04-2018
-->

<template>
  <Container>
    <div class="md-layout md-alignment-center-center">
    <md-empty-state
      md-rounded
      md-icon="weekend"
      md-label="An app to code and relax!"
      md-description="Vue.js plus Webpack, Firebase and Material Design. Nothing to worry about! :)">
    </md-empty-state>
  </div>
  </Container>
</template>

<script>
import Container from '@/components/Container.vue';

export default {
  name: 'About',
  components: {
    Container,
  },
};
</script>

<style scoped>
  .md-layout {
    min-height: 100%;
    min-width: 100%;
  }
</style>
