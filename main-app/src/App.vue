<template>
    <div id="app" style="border: 1px solid cornflowerblue">
      <h2>我是主应用</h2>
      <Button />
    </div>
  </template>
  <script>

  export default {
    components: {
        Button: () => import('remote_app/Button'), // 此处 app2使用app1的“微服务”
    }
  }
  </script>
  
