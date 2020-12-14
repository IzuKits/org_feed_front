<template>
    <section>
        <h2>Посты</h2>
        <div class="radio_wrapper">
            <label for="notfired"><div v-bind:class="notArchivedButton" >
            Публичные</div></label>
            <label for="fired"><div v-bind:class="archivedButton" >
            Архив</div></label>
            <input type="radio" name="f" id="notfired" v-model="isarchived" value="false"
            v-on:change="changeArchive">
            <input type="radio" name="f" id="fired" v-model="isarchived" value="true"
            v-on:change="changeArchive">
      </div>
      <GetBiggestByDayPanel v-if="isarchived === 'false'"/>
      <p>{{biggest_error}}</p>
        <Article
          v-for="article in posts"
          v-bind:key="article.id"
          v-bind:article="article"
          v-bind:role="'admin'"
        />
    <Paginator v-bind:page="page" v-bind:max_page="max_page" v-if="!biggest_status"/>
    </section>
</template>

<style scoped>

</style>
<script>
import Article from '../Article';
import HTTP from '../http-common';
import Paginator from '../Panels/Paginator';
import GetBiggestByDayPanel from '../Panels/GetBiggestByDayPanel';
import { eventBus } from '../../main';

export default {
  data() {
    return {
      biggest_status: false,
      biggest_error: '',
      all_posts: [],
      page: 1,
      posts: [],
      isarchived: 'false',
      max_page: '',
    };
  },
  created: function func() {
    this.getNoArchivedData();
    this.forPaginator();
    this.emitBiggestPost();
  },
  methods: {
    getNoArchivedData() {
      const url = '/post/moderation?page='.concat(this.page).concat(
        '&statuses=under_consideration,posted,returned_for_improvement,rejected');
      HTTP.get(url).then((response) => {
        this.posts = response.data.posts;
        this.max_page = response.data.pages_count;
      });
    },
    changeArchive() {
      if (this.isarchived === 'true') {
        this.getArchivedData();
      } else {
        this.getNoArchivedData();
      }
    },
    getArchivedData() {
      const url = '/post/moderation?page='.concat(this.page).concat(
        '&statuses=archived');
      HTTP.get(url).then((response) => {
        this.posts = response.data.posts;
        this.max_page = response.data.pages_count;
      });
    },
    forPaginator() {
      eventBus.$on('page', (p) => {
        this.page = p;
        if (this.isarchived === 'true') {
          this.getArchivedData();
        } else {
          this.getNoArchivedData();
        }
      });
    },
    emitBiggestPost() {
      eventBus.$on('get_biggest_post', (data) => {
        if (data.date === '') {
          document.location.reload();
        }
        HTTP.get('/feed/biggest?day='.concat(data.date)
          .concat('&include_archived=').concat(data.archive)).then((response) => {
          this.biggest_status = true;
          if (response === undefined) {
            this.posts = [];
            this.biggest_error = 'Пост не найден';
          }
          this.posts = [response.data];
        });
      });
    },
  },
  components: {
    Article,
    Paginator,
    GetBiggestByDayPanel,
  },
  computed: {
    notArchivedButton: function func() {
      return {
        radio_button: true,
        active_radio_button: this.isarchived === 'false',
      };
    },
    archivedButton: function func() {
      return {
        radio_button: true,
        active_radio_button: this.isarchived === 'true',
      };
    },
  },
};
</script>
<style scoped>
input[type="radio"]{
    display: none;
}

</style>

