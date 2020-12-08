<template>
    <div>
      <HeaderNav />
      <Articles v-bind:main_title='main_title'
      v-bind:type="type"/>
    </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav';
import Articles from '@/components/Articles';

export default {
  data() {
    return {
      type: 'news',
      main_title: 'Новости',
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
