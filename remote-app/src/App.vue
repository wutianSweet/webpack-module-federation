<template>
    <div id="app" style="border: 1px solid cornflowerblue">
      <h2>我是子应用</h2>
      <Button />
    </div>
  </template>
  <script>

  import Button from './components/Button/index.vue'

  export default {
    components: {
      Button
    }
  }
  </script>
  
