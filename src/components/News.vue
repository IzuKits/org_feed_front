<template>
    <div>
        <HeaderNav />
        <Articles v-bind:main_title='main_title' v-bind:articles="news"/>
    </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav';
import Articles from '@/components/Articles';

export default {
  data() {
    return {
      main_title: 'Новости',
      news: [
        {
          id: 1,
          title: 'Новость 1',
          pub_date: Date(),
          author: 'Автор 1',
          text: 'какой-то текст',
        },
        {
          id: 2,
          title: 'Новость 2',
          pub_date: Date(),
          author: 'Автор 3',
          text: 'какой-то текст',
        },
        {
          id: 3,
          title: 'Новость 3',
          pub_date: Date(),
          author: 'Автор 3',
          text: 'какой-то текст',
        },
      ],
    };
  },
  components: {
    HeaderNav,
    Articles,
  },


};
</script>

<style >
#news{
  background-color: rgb(255, 255, 110);
  color: black;
}
</style>
