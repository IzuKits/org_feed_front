<template>
      <section class="main">
      <h2>Профиль пользователя</h2>
      <p>Имя: {{ name }}</p>
      <p>E-mail: {{ email }}</p>
      <p>Статус: {{ role }}</p>
      <p>Подразделение: {{ subunit.name }}</p>
      <div id="exit_button" v-on:click="exit">
        Выйти из аккаунта
      </div>
      </section>
</template>

<script>
import HeaderNav from '@/components/HeaderNav';
import HTTP from './http-common';
import Cookies from './cookie_tools';


export default {
  components: {
    HeaderNav,
  },
  data() {
    return {
      name: '',
      email: '',
      role: '',
      subunit: '',
    };
  },
  created: function func() {
    const userid = Cookies.getCookie('id');
    HTTP.get('/employee?id='.concat(userid)).then((response) => {
      this.name = response.data.full_name;
      this.email = response.data.email;
      this.role = response.data.user_type;
      this.getSubunit(response.data.subunit);
    });
  },
  methods: {
    exit: function func() {
      Cookies.deleteCookie('id');
      Cookies.deleteCookie('at');
      Cookies.deleteCookie('rt');
      this.$router.push('login');
    },
    getSubunit(id) {
      HTTP.get('/subunit?id='.concat(id)).then((response) => {
        this.subunit = response.data;
        console.log(this.subunit);
      });
    },
  },
};
</script>

<style>
#profile{
  background-color: rgb(255, 255, 110);
  color: black;
}
</style>

<style scoped>
main{
  text-align: left;
}
#exit_button{
  margin: 2rem auto;
  padding: 0.5rem;
  background-color: rgb(65, 10, 10);
  color: white;
  box-shadow:  rgb(59, 59, 59) 0px 0px 2px;
  border: none;
  display: inline-block;
}
#exit_button:hover{
  cursor: pointer;
  background-color: white;
  color: black;
  transition-duration: 300ms;
}
section.main{
  text-align: left;
}
</style>
