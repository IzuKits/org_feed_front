<template>
    <div id="main">
        <nav>
            <ul>
                <li><a href="/u/news" class="nav-element">Новости</a></li>
                <li><a href="/u/announcements" class="nav-element">Объявления</a></li>
                <li><a href="/u/profile" class="nav-element">Личный кабинет</a></li>
                <li><a href="/u/newpost" class="nav-element">Новый пост</a></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
nav{
    background-color: blue;
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

</style>
