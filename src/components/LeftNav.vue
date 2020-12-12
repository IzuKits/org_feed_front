<template>
    <div id="main">
        <nav>
            <ul>
                <li><router-link to="/u/news" class="nav-element">Новости</router-link></li>
                <li><router-link to="/u/announcements" class="nav-element">Объявления
                </router-link></li>
                <li><router-link to="/u/profile" class="nav-element">Личный кабинет
                </router-link></li>
                <li class="serv">Управление</li>
                <li><router-link to="/u/newpost" class="nav-element">Новый пост</router-link></li>
                <li><router-link to="/u/myposts" class="nav-element">Мои посты</router-link></li>
                <li v-if="role === 'admin' || role === 'moderator'" class="adm">
                    <router-link to="/admin/consideration" class="nav-element adm">
                        Перейти в админ панель
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import { getRole } from '../main';


export default {
  data() {
    return {
      role: '',
    };
  },
  created() {
    getRole((r) => { this.role = r; });
  },
};
</script>
<style scoped>
nav{
    min-width: 20vw;
    margin-right: 1rem;
}
a.nav-element{
    background-color: rgb(59, 59, 59);
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: white;
    border-bottom: 1px rgb(170, 170, 170) solid;
}
a.nav-element:hover{
    background-color: rgb(88, 88, 88);
    cursor: pointer;
    transition-duration: 200ms;
}
ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
div.main{
    align-self: flex-start;
}
li.serv{
    background-color: rgb(255, 255, 137);
    color: black;
    padding: 0.5rem;
    margin-top: 0.5rem;
}
li.adm {
    margin-top: 0.5rem;
}

</style>
