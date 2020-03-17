<template>
  <div id="app">
    <Dialog />
    <router-view />
  </div>
</template>

<script>

  import Dialog from "./components/common/Dialog";

export default {
  name: 'App',
  components: {
    Dialog
  }
}
</script>

