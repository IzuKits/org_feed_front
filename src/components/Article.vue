<template>
    <li>
        <a href="">
            <h2>{{ article.title }}</h2>
            <p class="date">Дата публикации: {{ article.pub_date }}</p>
            <p>Автор: {{ article.author }}</p>
        </a>
    </li>
</template>

<script>
export default {
  props: {
    article: {},
  },
};

</script>

<style scoped>
    li{
        list-style: none;
        padding: 1rem;
        border: 1px solid rgb(59, 59, 59);
        margin-bottom: 2rem;
        text-align: left;
    }
    p.date{
        font-size: 0.7rem;
        border: 1px solid rgb(59, 59, 59);
        border: none;
    }
    a{
        text-decoration: none;
        color: unset;
    }
    h2{
        margin-bottom: 0;
    }

    li:hover{
        background-color: rgb(230, 230, 230);
        transition-duration: 300ms;
    }

</style>
