<template>
    <section class="main">
        <button onclick="window.history.back()" id="back_button">Назад</button>
        <hr>
        <div>
            <h1>{{ post.title }}</h1>
            <p class="mini">Дата публикации: {{ post.published_on }}</p>
            <p class="mini">Дата архивации: {{ post.archived_on }}</p>
            <p class="mini">Статус: {{ post.status }}</p>
            <p class="mini">Размер: {{ post.size }}</p>
            <p class="mini">Автор: {{ post.author.full_name }}</p>
            <p class="post_body">{{ post.body }}</p>
            <template v-if="role === 'admin' || role === 'moderator'">
            <p class="mini">Дата создания: {{ post.created_on }}</p>
            <p class="mini">Утвердил: {{ post.approved_by.fired }}</p>

            </template>
            <template v-if="post.attachments.length !== 0">
                <h4>Прикрепленные файлы</h4>
                <File v-for="file in post.attachments"
                v-bind:key="file.id"
                v-bind:file="file"/>
            </template>
        </div>
    </section>
</template>

<script>
import HTML from './http-common';
import File from './File';

export default {
  data: () => ({
    postId: '',
    post: '',
    role: '',
  }),
  created: function func() {
    this.postId = this.$route.params.id;
    this.getPost();
  },
  methods: {
    getPost() {
      HTML.get('/post?id='.concat(this.postId)).then((response) => {
        this.post = response.data;
      }).catch(() => {
        // eslint-disable-next-line no-alert
        alert('Произошла ошибка');
      });
    },
  },
  components: {
    File,
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
    font-size: 0.85rem;
    margin: 0.2rem 0;
}
h4{
    margin-bottom: 0.5rem;
}
.post_body {
    margin: 3rem auto;
}
</style>
