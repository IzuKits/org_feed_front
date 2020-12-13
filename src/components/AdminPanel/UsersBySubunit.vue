<template>
  <section>
      <button onclick="window.history.back()" id="back_button">Назад</button>
      <h2>Пользователи подразделения</h2>
      <h3>{{subunit.name}}</h3>
      <div class="radio_wrapper">
        <label for="notfired"><div v-bind:class="notFiredButton" >
          Текущие</div></label>
        <label for="fired"><div v-bind:class="firedButton" >
          Уволенные</div></label>
        <input type="radio" name="f" id="notfired" v-model="isfired" value="false"
        v-on:change="changeFired">
        <input type="radio" name="f" id="fired" v-model="isfired" value="true"
        v-on:change="changeFired">
      </div>
      <div style="text-align: left; padding: 1rem">
        <input type="checkbox" name="" id="adm" v-model="onlyAdmins" v-on:change="changeIsAdmin">
        <label for="adm">Только администраторы и модераторы</label>
      </div>
      <UserItem
        v-for="user in employees"
        v-bind:key="user.id"
        v-bind:user="user"
      />
  </section>
</template>

<script>
/* eslint-disable camelcase */

import UserItem from './UserItem';
import HTTP from '../http-common';

export default {
  data: () => ({
    users: [],
    subunitId: '',
    subunit: '',
    employees_backup: [],
    fired_employees: [],
    not_fired_employees: [],
    employees: [],
    isfired: 'false',
    onlyAdmins: false,
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
        const employees = this.subunit.employees;
        for (let i = 0; i < employees.length; i += 1) {
          if (employees[i].fired) {
            this.fired_employees.push(employees[i]);
          } else {
            this.not_fired_employees.push(employees[i]);
          }
        }
        this.employees = this.not_fired_employees;
      });
    },
    changeFired() {
      if (this.isfired === 'true') {
        this.employees = this.fired_employees;
      } else {
        this.employees = this.not_fired_employees;
      }
      this.employees_backup = this.employees;
      this.changeIsAdmin();
    },
    changeIsAdmin() {
      if (this.onlyAdmins) {
        this.employees_backup = this.employees;
        this.employees = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const emp of this.employees_backup) {
          if ((emp.user_type === 'admin') || (emp.user_type === 'moderator')) {
            this.employees.push(emp);
          }
        }
      } else {
        this.employees = this.employees_backup;
      }
    },
  },
  computed: {
    notFiredButton: function func() {
      return {
        radio_button: true,
        active_radio_button: this.isfired === 'false',
      };
    },
    firedButton: function func() {
      return {
        radio_button: true,
        active_radio_button: this.isfired === 'true',
      };
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
input[type="radio"]{
  display: none;
}
</style>
