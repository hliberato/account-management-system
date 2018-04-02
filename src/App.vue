<!--
@Author: Henrique Liberato <hliberato>
@Date:   29-03-2018
@Last modified by:   hliberato
@Last modified time: 02-04-2018
-->

<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine";
@include md-register-theme("default", (
  primary: md-get-palette-color(red, A700),
  accent: md-get-palette-color(bluegrey, 500)
));
@import "~vue-material/dist/theme/all";
</style>
