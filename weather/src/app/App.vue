<template>
  <main>
    <div class="splash-screen" v-if="loading"></div>
    <home v-else></home>
  </main>
</template>

<script>
  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  import Home from "./pages/Home";

  UIkit.use(Icons);

  export default {
    name: "app",
    components: {Home},
    computed: {
      loading() {
        return this.$store.state.loading
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '~uikit/dist/css/uikit.css';
  main {
    height: 100%;
    width: 100%;
  }

  .splash-screen {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: #498CEC;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
