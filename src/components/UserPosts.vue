<template>
    <section class="main">
      <h1>Мои посты</h1>
        <ul>
            <Article
                v-for="article in articles"
                v-bind:key="article.id"
                v-bind:article="article"
            />
        </ul>
    </section>
</template>

<script>
import Article from '@/components/Article';
import HTTP from './http-common';
import Cookies from './cookie_tools';

export default {
  data() {
    return {
      type: 'of_employee',
      main_title: 'Мои посты',
      articles: {},
    };
  },
  created: function func() {
    const userid = Cookies.getCookie('id');
    HTTP.get('/post/of_employee?id='.concat(userid)).then((response) => {
      this.articles = response.data;
    })
  },
  components: {
    Article,
  },
};
</script>
