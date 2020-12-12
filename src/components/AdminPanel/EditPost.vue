<template>
    <section>
        <h2>Изменить пост</h2>
            <form ref="form">
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
                <label><input v-model="type2" type="radio" name="post_type2" value="news"
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
            <template v-if="attachments.length !== 0">
                <h4>Прикрепленные файлы</h4>
                <File v-for="file in attachments"
                v-bind:key="file.id"
                v-bind:file="file"
                v-bind:edit="true"/>
            </template>
            <label for="file" style="margin-top: 2rem">Прикрепить файлы</label>
            <input  type="file" name="smth" id="file" multiple ref="new_files"
            v-on:change="handleFilesUpload()">
            <button v-on:click = "saveChanges">Сохранить изменения</button>
            <button v-on:click = "Cancel">Отменить</button>
        </form>
    </section>
</template>

<script>
import HTTP from '../http-common';
import File from '../File';
import { eventBus } from '../../main';

export default {
  data: () => ({
    id: '',
    type1: '',
    type2: '',
    title: '',
    body: '',
    attachments: {},
    new_files: '',
    id_files: [],
  }),
  created: function func() {
    this.id = this.$route.params.id;
    this.getDefaultPost();
    eventBus.$on('files_for_delete', (id) => {
      this.saveFilesForDelete(id);
    });
  },
  methods: {
    getDefaultPost() {
      HTTP.get('/post?id='.concat(this.id)).then((response) => {
        const data = response.data;
        let type = data.post_type;
        type = type.split('_');
        this.type1 = type[0];
        this.type2 = type[1];
        this.title = data.title;
        this.body = data.body;
        this.attachments = data.attachments;
      });
    },
    async saveChanges(e) {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      if (confirm('Сохранить изменения?')) {
        const myform = this.$refs.form;
        if (!myform.checkValidity()) {
          if (myform.reportValidity) {
            myform.reportValidity();
          }
        }
        for (let i = 0; i < this.attachments.length; i += 1) {
          this.id_files.push(this.attachments[i].id);
        }
        if (this.new_files !== '') {
          await this.submitFiles();
        }
        const data = {
          title: this.title,
          body: this.body,
          post_type: this.getPostType(),
          // eslint-disable-next-line quote-props
          'attachments': this.id_files,
        };
        HTTP.put('/post?id='.concat(this.id), data).then(() => {
        // eslint-disable-next-line no-alert
          alert('Пост успешно изменен');
          document.location.reload();
        }).catch(() => {
        // eslint-disable-next-line no-alert
          alert('Произошла ошибка, проверьте введенные данные');
        });
      }
    },
    Cancel() {
      alert('cancel');
    },
    saveFilesForDelete(id) {
      let index = -1;
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < this.attachments.length; i += 1) {
        if (this.attachments[i].id === id) {
          index = i;
        }
      }
      if (index > -1) {
        this.attachments.splice(index, 1);
      }
    },
    async submitFiles() {
      const header = { 'Content-Type': 'multipart/form-data' };

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.new_files.length; i++) {
        const formData = new FormData();
        formData.append('file', this.new_files[i]);

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
      this.new_files = this.$refs.new_files.files;
    },
  },
  components: {
    File,
  },
};
</script>

<style scoped>
form > *{
    display:block;
}
form > fieldset > *{
    display:block;
    text-align: left;
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
    display: inline-block;
    margin-top: 2rem;
}
button:hover{
    background-color: rgb(243, 243, 79);
    color: black;
    transition-duration: 300ms;
    cursor: pointer;
}
</style>
<style>
main {
    text-align: left;
}
</style>
