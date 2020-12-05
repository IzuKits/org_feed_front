<template>
        <header class="site-header">
            <div class="wrapper site-header__wrapper">
                <img src="logo.svg" alt="brand" class="brand"/>
                <nav class="nav">
                    <a href="/news" class="button" id="news">Новости</a>
                    <a href="/announcements" class="button" id="announ">Обьявления</a>
                    <a href="/profile" class="button" id="profile">Кабинет</a>
                </nav>
            </div>
        </header>
</template>


<style scoped>
.site-header {
  background-color: rgb(59, 59, 59);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  margin: 3rem auto;
  color: white;
}

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: auto;
}

.button{
    padding: 1rem;
    display: inline-block;
}

a{
    text-decoration: none;
    color: white;
}


</style>

<style>
    main{
        background-color: white;
        width: calc(80vw - 4rem);
        margin: auto;
        padding: 2rem;
    }
</style>
