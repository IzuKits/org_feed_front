<template>
<li>
        <div class="wrapper">
            {{subunit.name}}
            <p class="mini">Адрес: {{subunit.address}}</p>
            <p class="mini">E-mail: {{subunit.email}}</p>
            <p class="mini">Лидер: {{leader.full_name}}</p>
            <p class="mini">Телефон: {{subunit.phone}}</p>
            <div class="links-panel">
                <router-link v-bind:to="'/admin/subunit/posts/' + subunit.id">
                    Посты
                </router-link>
                <router-link v-bind:to="'/admin/subunit/' + subunit.id + '/users'">
                    Сотрудники
                </router-link>
            </div>
        </div>
</li>
</template>

<script>
import HTTP from '../http-common';

export default {
  props: {
    subunit: {},
    role: '',
  },
  data: () => ({
    leader: '',
  }),
  created: function func() {
    HTTP.get('/employee?id='.concat(this.subunit.leader)).then((response) => {
      this.leader = response.data;
    });
  },
};
</script>

<style  scoped>
.links-panel {
    margin-bottom: -0.5rem;
}
.links-panel > a{
    margin-left: 1rem;
    padding: 0.5rem;
    display: inline-block;
}
.links-panel > a:hover{
    background-color: rgb(165, 165, 165);
    transition-duration: 200ms;
}
.wrapper {
    text-align: left;
    margin: 1rem 0;
    font-size: 1.2rem;
    padding: 0.5rem;
    border: 1px solid rgb(59, 59, 59);
}
li {
    list-style: none;
}
a{
    text-decoration: none;
    color:  rgb(59, 59, 59);
}
.mini{
    font-size: 0.8rem;
}
</style>
