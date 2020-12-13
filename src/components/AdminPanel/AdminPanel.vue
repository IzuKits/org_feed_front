<template>
<div>
    <header class="site-header">
        <h3>Панель администратора</h3>
    </header>
    <main>
        <LeftNav v-bind:role="employee.user_type" />
        <section class="main">
          <router-view />
        </section>
    </main>
</div>
</template>

<script>
import LeftNav from './LeftNav';
import { getEmployee } from '../../main';

export default {
  data: () => ({
    employee: {},
  }),
  created() {
    getEmployee((user) => {
      this.employee = user;
    });
  },
  components: {
    LeftNav,
  },
};
</script>

<style scoped>
main{
    display: flex;
    width: calc(100vw - 1rem);
    align-items: flex-start;
}
main > div:nth-child(1){
    flex-grow: 0;
}
main > div:nth-child(2){
    flex-grow: 1;
}
.site-header {
    background-color: rgb(59, 59, 59);
    color: white;
    padding: 0.1rem;
    margin-top: 0;
    margin-bottom: 1rem;
}
</style>

