<template>
    <div id="app">
      <router-view />
    </div>
</template>

<script>

export default {
  components: { },
  name: 'App',
  data: () => ({
    employee: '',
  }),
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
  background-image: url('/static/imgs/backgroung.png');
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  color:  rgb(59, 59, 59);
  display: flex;
  justify-content: stretch;
  width: 100%;
}
button.edit{
    background-color: rgb(59, 59, 59);
    color: white;
    padding: 0.5rem;
    border: none;
    font-size: 1.1rem;
    display: inline-block;
    margin-top: 2rem;
}
button.edit:hover{
    background-color: rgb(243, 243, 79);
    color: black;
    transition-duration: 300ms;
    cursor: pointer;
}
.radio_wrapper{
  border-bottom: 1px solid black;
  text-align: left;
}
.radio_button{
  padding: 1rem;
  display: inline-block;
}
.radio_button:hover{
    background-color: rgb(177, 177, 177);
    transition-duration: 200ms;
    cursor: pointer;
}
.active_radio_button{
    background-color: rgb(59, 59, 59);
    color: white;
}
</style>

<style scoped>
.site-header {
  background-color: rgb(59, 59, 59);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  margin: 3rem auto;
  color: white;
}

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: auto;
}

.button{
    padding: 1rem;
    display: inline-block;
}

a{
    text-decoration: none;
    color: white;
}


</style>

<style>
    section.main{
        background-color: white;
        padding: 2rem;
        flex-grow: 1;
    }

</style>
