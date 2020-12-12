<template>
    <section class="main">
        <button onclick="window.history.back()" id="back_button">Назад</button>
        <hr>
        <div>
            <h1>{{ post.title }}</h1>
            <p class="mini">Дата создания: {{ post.created_on }}</p>
            <p class="mini">Дата публикации: {{ post.published_on }}</p>
            <p class="mini">Автор: {{ post.author.full_name }}</p>
            <p class="mini">Утвердил: {{ post.approved_by.full_name }}</p>
            <p class="mini">Тип: {{ post.post_type }}</p>
            <p class="mini" v-if="subunit !== ''">
                Подразделение: {{ subunit }}
            </p>
            <p class="mini">Статус: {{ post.status }}</p>
            <p class="mini">Размер: {{ post.size }}</p>

            <p class="mini">Текст:</p>
            <p class="post_body">{{ post.body }}</p>
            <template v-if="post.attachments.length !== 0">
                <h4>Прикрепленные файлы</h4>
                <File v-for="file in post.attachments"
                v-bind:key="file.id"
                v-bind:file="file"/>
            </template>
            <EditPostPanel
                v-bind:role="role"
                v-bind:id="post.id"
                v-bind:status="post.status"
                v-bind:userid="userid"
                v-bind:author="post.author"
            />
        </div>
    </section>
</template>

<script>
import HTTP from '../http-common';
import File from '../File';
import EditPostPanel from './EditPostPanel';
import { getEmployee } from '../../main';

export default {
  data: () => ({
    postId: '',
    post: '',
    role: '',
    userid: '',
    subunit: '',
  }),
  created: function func() {
    this.postId = this.$route.params.id;
    this.getPost();
    getEmployee((r) => {
      this.role = r.user_type;
      this.userid = r.id;
    });
    if (this.post.post_type === 'subunit_news' || this.post.post_type === 'subunit_announcement') {
      this.getSubunit();
    }
  },
  methods: {
    getPost() {
      HTTP.get('/post?id='.concat(this.postId)).then((response) => {
        this.post = response.data;
      }).catch(() => {
        // eslint-disable-next-line no-alert
        alert('Произошла ошибка');
      });
    },
    getSubunit() {
      const subId = this.post.author.subunit;
      HTTP.get('/subunit?id='.concat(subId)).then((response) => {
        this.subunit = response.data;
      });
    },
  },
  components: {
    File, EditPostPanel,
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
section.main{
    text-align: left;
}
p.mini {
    font-size: 1rem;
    margin: 0.2rem 0;
}
h4{
    margin-bottom: 0.5rem;
}
.post_body {
    margin: 3rem auto;
}
</style>
