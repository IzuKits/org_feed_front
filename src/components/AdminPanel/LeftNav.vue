<template>
    <div id="main">
        <nav>
            <ul>
                <li><router-link to="/u/profile" class="nav-element back-button">
                    Вернуться к главной части сайта
                </router-link></li>
                <li><router-link to="/admin/consideration" class="nav-element">Посты на рассмотрении
                </router-link></li>
                <li><router-link to="/admin/subunits" class="nav-element">Подразделения
                </router-link></li>
                <li class="nav-title">Управление</li>
            </ul>
        </nav>
    </div>
</template>
<script>

export default {
  props: {
    role: '',
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
li.nav-title{
    background-color: rgb(255, 255, 137);
    color: black;
    padding: 0.5rem;
    margin-top: 0.5rem;
}

a.back-button {
    margin-bottom: 0.5rem;
}

</style>
