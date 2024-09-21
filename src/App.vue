<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

  :root {
  --red: #F22539;
  --red-presses: #C00E20;
  --yellow: #ECA539;
  --principal-grey: #353535;
  --second-grey: #f5f5f5;
  --disabled-grey: #BFBFBF;
  --white-background:#F9F9F9
}

  #app {
    font-family: 'Lato';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--principal-grey);
    background-color: var(--white-background)
  }
  .globalContain{
    margin: auto;
    width: 90%;
    max-width: 600px;
    position: relative;
  }
  h1{
    font-size: 36px;
  }
  h2{
    font-size: 26px;
  }
  h3{
    font-size: 22px;
  }
  p{
    font-size: 18px;
  }
  .principal-button{
    text-transform: capitalize !important;
    font-weight: 700 !important;
  }
/* 
  .lato-thin {
    font-family: "Lato", sans-serif;
    font-weight: 100;
    font-style: normal;
  }

  .lato-regular {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .lato-bold {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-style: normal;
  } */

</style>

