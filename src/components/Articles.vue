<template>
      <div>
        <h1>{{ main_title }}</h1>
        <hr>
            <div class="checks">
            <label>
                <input type="checkbox" class="option-input checkbox"
                v-model="only_subunit" v-on:change="select_articles" />
                    Только по подразделению
                </label>
            </div>
        <ul>
            <Article
                v-for="article in articles"
                v-bind:key="article.id"
                v-bind:article="article"
            />
        </ul>
      </div>
</template>


<script>
import Article from '@/components/Article';
import HTTP from './http-common';
import Cookies from './cookie_tools';
// import Cookies from './cookie_tools';


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
    };
  },
  components: {
    Article,
  },
  created: function func() {
    const userid = Cookies.getCookie('id');
    HTTP.get('/employee?id='.concat(userid)).then((response) => {
      this.subunit_id = response.data.subunit;
    });
    HTTP.get('/feed/'.concat(this.type).concat('/organization?page=').concat(this.page_num)).then((response) => {
      this.articles = response.data.posts;
    });
  },
  methods: {
    select_articles: function func() {
      let path = '/feed/'.concat(this.type).concat('/');
      if (this.only_subunit) {
        path += 'subunit?id='.concat(this.subunit_id).concat('&page=');
      } else {
        path += 'organization?page=';
      }
      HTTP.get(path.concat(this.page_num)).then((response) => {
        this.articles = response.data.posts;
      });
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

    *{font-family: 'Roboto', sans-serif;}

.checks{
    text-align: left;
}
.checks > label{
    font-size: 1.1rem;
}

@keyframes click-wave {
  0% {
    height: 40px;
    width: 40px;
    opacity: 0.5;
    position: relative;
  }
  100% {
    height: 200px;
    width: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0;
  }
}

.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  top: 13.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 40px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: rgb(59, 59, 59);
}
.option-input:checked::before {
  height: 40px;
  width: 40px;
  position: absolute;
  content: '✔';
  display: inline-block;
  font-size: 26.66667px;
  text-align: center;
  line-height: 40px;
}
.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #fcff63;
  content: '';
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
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


</style>
