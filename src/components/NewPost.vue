<template>
    <section class="main">
        <h2>Создание новости</h2>
        <form method="POST" ref="form">
            <fieldset>
                <legend>Пост для организации или для подразделения?</legend>
                <label>
                    <input v-model="type1" type="radio" name="post_type1"
                     value="organization" id="" checked>
                    Для организации
                </label>
                <label>
                    <input v-model="type1" type="radio" name="post_type1" value="subunit"
                     id="">Для подразделения
                </label>
            </fieldset>
            <fieldset>
                <legend>Тип поста</legend>
                <label><input v-model="type2" type="radio" name="post_type2" value="new"
                 id="" checked> Новость
                </label>
                <label>
                    <input v-model="type2" type="radio" name="post_type2" value="announcements"
                     id="" >
                    Объявление
                </label>
            </fieldset>
            <label for="title">Заголовок поста</label>
            <input v-model="title" type="text" name="title" id="title" required>
            <label for="text">Текст</label>
            <textarea v-model="body" name="body" id="text" cols="100" rows="20" required>
            </textarea >
            <label for="file">Прикрепить файлы</label>
            <input  type="file" name="smth" id="file" multiple ref="files"
            v-on:change="handleFilesUpload()">
            <button v-on:click = "formSubmit">Отправить на подтверждение</button>
        </form>
    </section>
</template>

<script>
import HTTP from './http-common';

export default {
  data: () => ({
    type1: 'organization',
    type2: 'new',
    title: '',
    body: '',
    files: '',
    id_files: [],
  }),
  methods: {
    async formSubmit(e) {
      e.preventDefault();
      const myform = this.$refs.form;
      if (!myform.checkValidity()) {
        if (myform.reportValidity) {
          myform.reportValidity();
        }
      }
      if (this.files !== '') {
        await this.submitFiles();
      }

      const data = {
        title: this.title,
        body: this.body,
        post_type: this.getPostType(),
        // eslint-disable-next-line quote-props
        'attachments': this.id_files,
      };
      HTTP.post('/post', data).then(() => {
        // eslint-disable-next-line no-alert
        alert('Пост успешно создан');
        document.location.href = '/u/news';
      }).catch(() => {
        // eslint-disable-next-line no-alert
        alert('Произошла ошибка, проверьте введенные данные');
      });
    },
    getPostType() {
      let pType = '';
      if (this.type1 === 'organization') {
        pType += 'organization_';
      } else {
        pType += 'subunit_';
      }
      if (this.type2 === 'new') {
        pType += 'news';
      } else {
        pType += 'announcement';
      }
      return pType;
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
    async submitFiles() {
      const header = { 'Content-Type': 'multipart/form-data' };

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.files.length; i++) {
        const formData = new FormData();
        formData.append('file', this.files[i]);

        // eslint-disable-next-line no-await-in-loop
        await HTTP.post('/attachment', formData, { header }).then((response) => {
          this.id_files.push(response.data.id);
        // eslint-disable-next-line no-loop-func
        }).catch(() => {
          // eslint-disable-next-line no-alert
          alert('Произошла ошибка при загрузке файла');
        });
      }
    },
  },
};
</script>

<style scoped>
form > *{
    display:block;
}
form > fieldset > *{
    display:block;
}
section{
    text-align: left;
}
fieldset{
    margin: 1rem 0;
}
input[type="text"],
input[type="file"]{
    margin: 1rem 0;
}
button{
    background-color: rgb(59, 59, 59);
    color: white;
    padding: 0.5rem;
    border: none;
    font-size: 1.1rem;
}
button:hover{
    background-color: rgb(243, 243, 79);
    color: black;
    transition-duration: 300ms;
    cursor: pointer;
}
</style>
