<template>
  <section>
      <button onclick="window.history.back()" id="back_button">Назад</button>
      <h2>Пользователи подразделения</h2>
      <h3>{{subunit.name}}</h3>
      <hr>
      <UserItem
        v-for="user in subunit.employees"
        v-bind:key="user.id"
        v-bind:user="user"
      />
  </section>
</template>

<script>
import UserItem from './UserItem';
import HTTP from '../http-common';

export default {
  data: () => ({
    users: [],
    subunitId: '',
    subunit: '',
  }),
  components: {
    UserItem,
  },
  created: function func() {
    this.subunitId = this.$route.params.id;
    this.getSubunit();
  },
  methods: {
    getSubunit() {
      HTTP.get('/subunit?id='.concat(this.subunitId)).then((response) => {
        this.subunit = response.data;
      });
    },
  },
};
</script>

<style scoped>
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
</style>
