<template>
    <div class="wrapper">
        <div class="button" v-on:click="ApprovePost"
            v-if="status === 'under_consideration' || status === 'rejected'">
            Подтвердить
        </div>
        <div class="button" v-on:click="DisapprovePost" v-if="status === 'under_consideration'">
            Отклонить
        </div>
        <div class="button" v-on:click="DisapproveApprovePost" v-if="status === 'posted'">
            Отклонить
        </div>
        <div class="button" v-on:click="DeletePost">Удалить</div>
        <div class="button" v-on:click="ArchivePost" v-if="status !== 'archived'">
            Архивировать
        </div>
        <div class="button" v-on:click="UnarchivePost" v-if="status === 'archived'">
            Разархивировать
        </div>
        <router-link tag="div" v-bind:to="'/admin/post/'.concat(this.id).concat('/edit')"
        v-if="role === 'admin' ||
            (role === 'moderator' && userid === author.id)"
         class="button">
        Изменить
        </router-link>

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
    status: '',
    userid: '',
    author: '',
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
        HTTP.delete('/post?id='.concat(this.id)).then(() => {
          document.location = '/admin/consideration';
        });
      }
    },
    DisapprovePost() {
      if (confirm('Вы уверены что хотите отправить этот пост на доработку?')) {
        HTTP.post('/post/reject?id='.concat(this.id)).then(() => {
          document.location.reload();
        });
      }
    },
    ArchivePost() {
      if (confirm('Вы уверены что хотите отправить этот пост в архив?')) {
        HTTP.post('/post/archive?id='.concat(this.id)).then(() => {
          document.location.reload();
        });
      }
    },
    DisapproveApprovePost() {
      if (confirm('Вы уверены что хотите отклонить этот ранее принятый пост?')) {
        HTTP.delete('/post/approve?id='.concat(this.id)).then(() => {
          document.location.reload();
        });
      }
    },
    UnarchivePost() {
      if (confirm('Вы уверены что хотите разархивировать этот пост?')) {
        HTTP.delete('/post/archive?status=posted&id='.concat(this.id)).then(() => {
          document.location.reload();
        });
      }
    },
  },
};
</script>

<style  scoped>
.wrapper {
    margin: 2rem auto;
    display: flex;
    justify-content: space-around;
}
.button{
    padding: 0.5rem;
    border-radius: 6px;
    background-color: rgb(59, 59, 59);
    color: white;
}

.button:hover{
    transition-duration: 200ms;
    background-color: rgba(245, 245, 106, 0.719);
    color: black;
    cursor: pointer;
}
</style>
