<template>
    <div id="app">
      <router-view/>
    </div>
</template>

<script>
export default {
  components: { },
  name: 'App',
};
</script>

<style>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  margin: 0;
  background-image: url('/static/imgs/backgroung.jpg');
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  color:  rgb(59, 59, 59);
}

</style>
