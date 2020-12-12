<template>
    <section>
        <button onclick="window.history.back()" id="back_button">Назад</button>
        <h2>Посты подразделения</h2>
        <h3>{{ subunitName }}</h3>
        <ChangePostTypePanel />
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
import ChangePostTypePanel from './ChangePostTypePanel';
import { eventBus } from '../../main';


export default {
  data() {
    return {
      type: 'news',
      page: 1,
      articles: {},
      subunitId: '',
      subunitName: '',
    };
  },
  components: {
    Article,
    ChangePostTypePanel,
  },
  created: function func() {
    this.subunitId = this.$route.params.id;
    eventBus.$on('post_type_subunit', (type) => {
      this.type = type;
      this.setArticles();
    });
    this.setArticles();
    this.getSubunitName();
  },
  methods: {
    setArticles() {
      HTTP.get(('/feed/').concat(this.type).concat('/subunit?page=').concat(this.page).concat('&id=')
        .concat(
          this.subunitId,
        )).then((response) => {
        this.articles = response.data.posts;
      });
    },
    getSubunitName() {
      HTTP.get('/subunit?id='.concat(this.subunitId)).then((response) => {
        this.subunitName = response.data.name;
      });
    },
  },
};
</script>

<style scoped>
#back_button{
    padding: 0.4rem;
    border: 0;
    font-size: 1.3rem;
    text-align: left;
    display: block;
}
#back_button:hover{
    cursor: pointer;
    background-color: rgb(59, 59, 59);
    color: white;
    transition-duration: 300ms;
}
</style>
