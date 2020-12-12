<template>
    <section>
        <h1>{{ main_title }}</h1>
        <Article
            v-for="article in articles1"
            v-bind:key="article.id"
            v-bind:article="article"
            v-bind:role="'admin'"
        />
        <Article
            v-for="article in articles2"
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
      articles1: {},
      articles2: {},
    };
  },
  components: {
    Article,
  },
  created: function func() {
    HTTP.get('/post/moderation?page='.concat(this.page).concat(
      '&type=').concat('news').concat('&statuses=under_consideration')).then((response) => {
      this.articles1 = response.data.posts;
    });
    HTTP.get('/post/moderation?page='.concat(this.page).concat(
      '&type=').concat('announcements').concat('&statuses=under_consideration')).then((response) => {
      this.articles2 = response.data.posts;
    });
  },
};
</script>
