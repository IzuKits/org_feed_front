<template>
    <div class="top">
        <p v-on:click="showDescription">{{ file.filename }}</p>
        <div v-bind:id="'description' + file.id" class="description">
            <p>Автор: {{ file.author.full_name }}</p>
            <p>Размер: {{ file.size }}</p>
            <a v-on:click="downloadFile">Скачать файл</a>
            <a v-if="edit" v-on:click="deleteFile">Удалить файл</a>
        </div>
    </div>
</template>

<script>
import JQuery from 'jquery';
import HTTP from './http-common';
import { eventBus } from '../main';

export default {
  props: {
    edit: true,
    file: '',
  },
  methods: {
    showDescription() {
      JQuery('#description'.concat(this.file.id)).slideToggle(200);
    },
    downloadFile() {
      HTTP({
        url: '/attachment?id='.concat(this.file.id), // your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.file.filename); // or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    deleteFile() {
      if (confirm('Удалить файл?')) {
        eventBus.$emit('files_for_delete', this.file.id);
      }
    },
  },
};
</script>

<style scoped>
div{
    background-color: rgba(90, 90, 90, 0.247);
    padding: 6px;
    margin: 3px;
}
div.top:hover{
    cursor: pointer;
    background-color: rgba(245, 245, 106, 0.719);
    transition-duration: 300ms;
}
div > p{
    margin: 0;
}
.description {
    display: none;
}
div.description {
    font-size: 0.8rem;
}
a{
    background-color:  rgb(59, 59, 59);
    text-decoration: none;
    padding: 0.15rem;
    display: inline-block;
    font-size: 1rem;
    color: white;
    margin: 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0);
}
a:hover{
    border: 1px solid rgb(255, 255, 255);
}
</style>
