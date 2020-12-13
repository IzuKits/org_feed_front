<template>
<section>
    <h1>{{title}}</h1>
    <form action="" ref="form">
        <label for="name">Полное имя</label>
        <input type="text" name="" id="name" v-model="name" required>
        <label for="email">E-mail</label>
        <input type="email" name="" id="email" v-model="email" required>
        <label for="" v-if="!newUser">
            <input type="checkbox" name="" id="" v-model="fired">
            Уволен
        </label>
        <template v-if="role === 'admin'">
        <label for="user_type">Тип пользователя</label>
        <select name="" id="user_type" v-model="user_type" required>
            <option
                v-for="option in user_type_options"
                v-bind:key="option.value"
                v-bind:value="option.value" > {{option.text}}
            </option>
        </select>
        </template>
        <label for="subunit">Подразделение</label>
        <select id="subunit" v-model="subunit" required>
            <option
                v-for="subunit in subunit_options"
                v-bind:key="subunit.value"
                v-bind:value="subunit.value">
                {{subunit.text}}
            </option>
        </select>
        <template v-if="newUser">
            <label for="pass">Пароль</label>
            <input type="password" name="pass" id="pass" v-model="password" required minlength="8">
        </template>
        <button class="edit" v-on:click="Save" v-if="!newUser">
            Сохранить изменения</button>
        <button class="edit" v-on:click="Register" v-else>
            Зарегестрировать</button>
        <router-link tag="button"
        class="edit"
        v-bind:to="'/admin/userprofile/'.concat(this.user.id)">
        Отмена</router-link>
    </form>
</section>
</template>

<script>
/* eslint-disable no-alert */
import HTTP from '../http-common';
import { getRole } from '../../main';

export default {
  props: {
    title: {
      default: 'Изменить данные о пользователе',
    },
    newUser: {
      default: false,
    },
  },
  data: () => ({
    role: '',
    user: '',
    name: '',
    fired: '',
    email: '',
    user_type: '',
    user_type_options: [
      { text: 'Админ', value: 'admin' },
      { text: 'Модератор', value: 'moderator' },
      { text: 'Обычный пользователь', value: 'user' },
    ],
    subunit: '',
    subunit_options: [],
    password: '',
  }),
  created: async function func() {
    if (!this.newUser) {
      await this.setDefaultData();
    }
    this.getSubunitOptions();
    getRole((role) => {
      this.role = role;
    });
  },
  methods: {
    setDefaultData() {
      return new Promise((resolve) => {
        const id = this.$route.params.id;
        HTTP.get('/employee?id='.concat(id)).then((response) => {
          this.user = response.data;
          this.name = this.user.full_name;
          this.email = this.user.email;
          this.fired = this.user.fired;
          this.user_type = this.user.user_type;
          this.subunit = this.user.subunit;
          resolve();
        });
      });
    },
    getSubunitOptions() {
      HTTP.get('/subunit/multiple').then((response) => {
        const subunits = response.data;
        // eslint-disable-next-line no-restricted-syntax
        for (const iterator of subunits) {
          this.subunit_options.push({
            text: iterator.name,
            value: iterator.id,
          });
        }
      });
    },
    Save(e) {
      e.preventDefault();
      const myform = this.$refs.form;
      if (!myform.checkValidity()) {
        if (myform.reportValidity) {
          myform.reportValidity();
          return;
        }
      }
      // eslint-disable-next-line no-alert
      if (confirm('Сохранить измнения?')) {
        const data = {
          full_name: this.name,
          email: this.email,
          fired: this.fired,
          subunit: this.subunit,
          user_type: this.user_type,
        };
        HTTP.put('/employee?id='.concat(this.user.id), data).then(() => {
          alert('Изменения сохранены');
          document.location.href = '/admin/userprofile/'.concat(this.user.id);
        }).catch(() => {
          alert('Произошла ошибка, проверьте введенные данные');
        });
      }
    },
    Register(e) {
      e.preventDefault();
      const myform = this.$refs.form;
      if (!myform.checkValidity()) {
        if (myform.reportValidity) {
          myform.reportValidity();
          return;
        }
      }
      if (confirm('Зарегестрировать пользователя?')) {
        const data = {
          full_name: this.name,
          email: this.email,
          subunit: this.subunit,
          user_type: this.user_type,
          password: this.password,
        };
        HTTP.post('/employee', data).then((response) => {
          alert('Пользователь зарегестрирован');
          document.location.href = '/admin/userprofile/'.concat(response.data.id);
        }).catch(() => {
          alert('Произошла ошибка, проверьте введенные данные');
        });
      }
    },
  },
};
</script>

<style scoped>
form > *{
    display: block;
    text-align: left;
}
form > button{
    display: inline-block;
}
form > label{
    margin: 0.5rem 0;
    margin-top: 2rem;
}
section{
    text-align: left;
}
</style>
