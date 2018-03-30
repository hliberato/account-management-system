<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 30-03-2018
-->

<template>
  <Header>

    <div class="home">
      <img src="../assets/logo.png">
      <Welcome msg="Welcome to the Deal With It Project!"/>
    </div>
  </Header>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Management',
  components: {
    Welcome,
    Header,
  },
};
</script>
