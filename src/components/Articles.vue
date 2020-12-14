<template>
      <div>
        <h1>{{ main_title }}</h1>
            <div class="radio_wrapper">
              <label for="fired"><div v-bind:class="organiztionButton" >
                Организация</div></label>
              <label for="notfired"><div v-bind:class="subunitButton" >
                Подразделение</div></label>
              <input type="radio" name="f" id="notfired" v-model="select" value="subunit"
              v-on:change="select_articles">
              <input type="radio" name="f" id="fired" v-model="select" value="organization"
              v-on:change="select_articles">
            </div>
        <ul>
            <Article
                v-for="article in articles"
                v-bind:key="article.id"
                v-bind:article="article"
            />
        </ul>
            <Paginator v-bind:page="page_num" v-bind:max_page="max_page" v-if="!biggest_status"/>
      </div>
</template>


<script>
import Article from '@/components/Article';
import HTTP from './http-common';
import Cookies from './cookie_tools';
import Paginator from './Panels/Paginator';
import { eventBus } from '../main';


export default {
  props: {
    main_title: {},
    type: '',
  },
  data() {
    return {
      articles: {},
      only_subunit: false,
      page_num: 1,
      subunit_id: '',
      max_page: '',
      select: 'organization',
    };
  },
  components: {
    Article, Paginator,
  },
  created: function func() {
    const userid = Cookies.getCookie('id');
    HTTP.get('/employee?id='.concat(userid)).then((response) => {
      this.subunit_id = response.data.subunit;
    }).then(() => {
      this.select_articles();
    });
    /* HTTP.get('/feed/'.concat(this.type).concat('/'.concat'?page=')
        .concat(this.page_num)).then((response) => {
      this.articles = response.data.posts;
      this.max_page = response.data.pages_count;
    }); */
    eventBus.$on('page', (p) => {
      this.page_num = p;
      this.select_articles();
    });
  },
  methods: {
    select_articles: function func() {
      let path = '/feed/'.concat(this.type).concat('/')
        .concat(this.select);
      if (this.select === 'subunit') {
        path += '?id='.concat(this.subunit_id).concat('&page=');
      } else {
        path += '?page=';
      }
      HTTP.get(path.concat(this.page_num)).then((response) => {
        this.articles = response.data.posts;
        this.max_page = response.data.pages_count;
      });
    },
  },
  computed: {
    organiztionButton: function func() {
      return {
        radio_button: true,
        active_radio_button: this.select === 'organization',
      };
    },
    subunitButton: function func() {
      return {
        radio_button: true,
        active_radio_button: this.select === 'subunit',
      };
    },
  },
};
</script>


<style scoped>

    h1{
        text-align: left;
    }

    ul{
        padding: 0;
    }

body {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: box;
  background: #e8ebee;
  color: #9faab7;
  font-family: "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
  text-align: center;
}
input[type='radio']{
  display: none;
}

</style>
