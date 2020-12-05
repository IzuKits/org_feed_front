<template>
  <div>
    <HeaderNav />
    <main>
      <h2>Профиль пользователя</h2>
      <p>{{ name }}</p>
      <p>{{ email }}</p>
      <p>{{ role }}</p>
    </main>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav';
import HTTP from './http-common';


export default {
  components: {
    HeaderNav,
  },
  data() {
    return {
      name: '',
      email: '',
      role: '',
    };
  },
  created: function func() {
    const userid = localStorage.getItem('id');
    HTTP.get('/employee?id='.concat(userid)).then((response) => {
      this.name = response.data.full_name;
      this.email = response.data.email;
      this.role = response.data.user_type;
    });
  },
};
</script>

<style>
#profile{
  background-color: rgb(255, 255, 110);
  color: black;
}
</style>

