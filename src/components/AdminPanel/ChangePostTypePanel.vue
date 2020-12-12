<template>
    <div class="wrapper">
        <div class="button" v-bind:class="newsClass" v-on:click="setNews">Новости</div>
        <div class="button"  v-bind:class="announcementsClass"
         v-on:click="setAnnouncements">Объявления</div>
    </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  data() {
    return {
      type: 'news',
      newsClass: 'active',
      announcementsClass: '',
    };
  },
  methods: {
    setNews() {
      this.type = 'news';
      eventBus.$emit('post_type_subunit', this.type);
      this.newsClass = 'active';
      this.announcementsClass = '';
    },
    setAnnouncements() {
      this.type = 'announcements';
      eventBus.$emit('post_type_subunit', this.type);
      this.newsClass = '';
      this.announcementsClass = 'active';
    },
  },
};
</script>

<style scoped>
.wrapper{
    text-align: left;
    margin-bottom: 1rem;
    width: 100%;
    border-bottom: 1px solid black;
}

div.button{
    padding: 1rem;
    display: inline-block;
}
div.button:hover{
    background-color: rgb(177, 177, 177);
    transition-duration: 200ms;
    cursor: pointer;
}
.active{
    background-color: rgb(59, 59, 59);
    color: white;
}
</style>
