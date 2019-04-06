<template>
  <main>
    <home></home>
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
  }
</script>

<style scoped lang="scss">
  @import '~uikit/dist/css/uikit.css';
  main {
    height: 100%;
    width: 100%;
  }
</style>
