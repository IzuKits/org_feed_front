<template>
<section>
    <button onclick="window.history.back()" id="back_button">Назад</button>
    <p>Имя: {{user.full_name}}</p>
    <p>E-mail: {{user.email}}</p>
    <p>Тип пользователя: {{user.user_type}}</p>
    <p>Уволен?: {{user.fired}}</p>
    <p>Подразделение: {{subunit.name}}</p>
    <router-link v-bind:to="'/admin/userprofile/' + user.id + '/edit'"
    class="button"
    v-if="currentUser.user_type === 'admin' ||
    (currentUser.user_type === 'moderator' && currentUser.id === user.id)">
        Изменить профиль
    </router-link>
</section>
</template>

<script>
import HTTP from '../http-common';
import { getEmployee } from '../../main';


export default {
  data: () => ({
    user: '',
    subunit: '',
    currentUser: '',
  }),
  created: function func() {
    const id = this.$route.params.id;
    HTTP.get('/employee?id='.concat(id)).then((response) => {
      this.user = response.data;
      HTTP.get('/subunit?id='.concat(this.user.subunit)).then((response2) => {
        this.subunit = response2.data;
      });
    });
    getEmployee((user) => { this.currentUser = user; });
  },
};
</script>

<style scoped>
section > *{
    text-align: left;
}
#back_button{
    padding: 0.4rem;
    border: 0;
    font-size: 1.3rem;
    text-align: left;
    display: block;
}
#back_button:hover{
    cursor: pointer;
    background-color: rgb(59, 59, 59);
    color: white;
    transition-duration: 300ms;
}
.button{
    margin-top: 2rem;
    background-color: rgb(59, 59, 59);
    display: inline-block;
    padding: 0.5rem;
    color: white;
    text-decoration: none;
}
.button:hover{
    cursor: pointer;
    background-color: rgb(189, 189, 189);
    color: black;
    transition-duration: 200ms;
}
</style>
