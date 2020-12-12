<template>
    <div class="wrapper">
        <div class="button" v-on:click="ApprovePost">Подтвердить</div>
        <div class="button" v-on:click="DisapprovePost">Отклонить</div>
        <div class="button" v-on:click="DeletePost">Удалить</div>
        <div v-if="role === 'admin'" class="button">Изменить</div>
    </div>
</template>

<script>
/* eslint-disable no-alert */
/* eslint-disable no-console */

import HTTP from '../http-common';

export default {
  props: {
    role: '',
    id: '',
  },
  methods: {
    ApprovePost() {
      if (confirm('Вы уверены что хотите подтвердить этот пост?')) {
        HTTP.post('/post/approve?id='.concat(this.id)).then(() => {
          document.location.reload();
        });
      }
    },
    DeletePost() {
      if (confirm('Вы уверены что хотите удалить этот пост?')) {
        HTTP.delete('/post?id='.concat(this.id)).then((response) => {
          console.log(response);
          // document.location = '/admin/consideration';
        });
      }
    },
    DisapprovePost() {
      if (confirm('Вы уверены что хотите отправить этот пост на доработку?')) {
        HTTP.delete('/post/approve?id='.concat(this.id)).then((response) => {
          console.log(response);
          // document.location.reload();
        });
      }
    },
  },
};
</script>

<style  scoped>
.wrapper {
    display: flex;
    justify-content: center;
}
.button{
    padding: 0.5rem;
    border-radius: 6px;
    background-color: rgb(59, 59, 59);
    color: white;
    margin: 0 2rem;
}

.button:hover{
    transition-duration: 200ms;
    background-color: rgba(245, 245, 106, 0.719);
    color: black;
    cursor: pointer;
}
</style>
