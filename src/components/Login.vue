<template>
    <div id='log'>
        <h2>Необходимо выполнить вход</h2>
        <form action="POST">
            <label for="imail">e-mail</label>
            <input type="email" name="email" v-model="email" required>
            <label for="password">Пароль</label>
            <input type="password" name="password" v-model="password" required>
            <p id="error_msg" v-bind:class="Invisible">{{ error_msg }}</p>
            <input type="submit" value="Войти" id="submit" v-on:click="formSubmit">
        </form>
    </div>
</template>

<script>
import HTTP from './http-common';
import Cookies from './cookie_tools';

export default {
  data: () => ({
    email: '',
    password: '',
    error_msg: '',
  }),
  methods: {
    formSubmit(e) {
      e.preventDefault();
      HTTP.post('/employee/auth', {
        email: this.email,
        password: this.password,
      }).then((response) => {
        Cookies.setCookie('at', response.data.access_token, 2);
        HTTP.defaults.headers.post.Authorization = response.data.access_token;
        Cookies.setCookie('rt', response.data.refresh_token, 30);
        Cookies.setCookie('id', response.data.user_id, 100);
        document.location.href = '/profile';
      }).catch((error) => {
        if (error.response.status === 400) {
          this.error_msg = 'Неправильное имя пользователя или пароль';
        }
      });
    },
  },
  computed: {
    Invisible: function func() {
      return {
        invisible: this.error_msg === '',
      };
    },
  },
};
</script>

<style>
    #log{
        width: 30vw;
        background-color: white;
        margin: 20vh auto;
        padding: 1rem;
    }

    #log > form > *{
        display: block;
        margin: auto;
    }

    #log > form > label {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }

    #log > form > #submit{
        margin: 2rem auto;
        padding: 0.5rem;
        width: 50%;
        background-color: rgb(59, 59, 59);
        color: white;
        box-shadow:  rgb(59, 59, 59) 0px 0px 2px;
        border: none;
    }
    #log > form > #submit:hover{
        cursor: pointer;
        background-color: white;
        color: black;
        transition-duration: 300ms;
    }
    #error_msg{
        background-color: rgb(255, 196, 175);
        border: 1px solid rgb(151, 0, 0);
        border-radius: 6px;
        color: rgb(70, 0, 0);
        padding: 1rem;
        margin-top: 1rem !important;
    }
    .invisible{
        display: none !important;
    }
</style>

<style scoped>
    h2{
        border-bottom: 1px solid rgb(59, 59, 59);
        padding-bottom: 1rem ;
    }
</style>
