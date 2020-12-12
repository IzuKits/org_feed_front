<template>
    <li>
        <router-link :to= "'/' + this.user + '/post/' + article.id">
            <h2>{{ article.title }}</h2>
            <p class="date">Дата публикации: {{ article.published_on }}</p>
            <p>Автор: {{ article.author.full_name }}</p>
        </router-link>
    </li>
</template>

<script>
export default {
  props: {
    article: {},
    role: '',
  },
  data: () => ({
    user: 'u',
  }),
  created: function func() {
    if (this.role !== undefined) {
      this.user = this.role;
    }
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
    li > *{
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
