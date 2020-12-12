<template>
    <section>
        <h1>{{ main_title }}</h1>
        <Article
            v-for="article in articles"
            v-bind:key="article.id"
            v-bind:article="article"
            v-bind:role="'admin'"
        />

    </section>
</template>

<script>
import Article from '../Article';
import HTTP from '../http-common';

export default {
  data() {
    return {
      main_title: 'Посты, ожидающие подтверждения',
      type: 'news',
      page: 1,
      articles: {},
    };
  },
  components: {
    Article,
  },
  created: function func() {
    HTTP.get('/post/moderation?page='.concat(this.page).concat('&statuses=under_consideration')).then((response) => {
      this.articles = response.data.posts;
    });
  },
};
</script>
