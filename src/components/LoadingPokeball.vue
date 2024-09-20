<template>
  <v-overlay :value="loading" absolute opacity="opacity" color="white">
    <v-img cover :src="loaderUrl" class="pokeball"></v-img>
  </v-overlay>
</template>

<script>
  import imgLoader from "@/assets/images/Loader.png";
  
  export default {
    name: 'LoadingPokeball',
    data() {
      return {
        loaderUrl:imgLoader
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: true,
      }
    }
  };
</script>
<style>
  .pokeball {
    height:106px;
    width:106px;
    position: relative;
    animation: pk 1s infinite cubic-bezier(0.5,120,0.5,-120);
  }
  @keyframes pk { 
    30%,70% {transform:rotate(0deg)}
    49.99%  {transform:rotate(0.2deg)}
    50%     {transform:rotate(-0.2deg)}
  }
</style>