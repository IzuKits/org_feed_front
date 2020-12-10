<template>
    <section class="main">
        <Articles v-bind:main_title='main_title'
        v-bind:type="type"/>
    </section>
</template>

<script>
import LeftNav from '@/components/LeftNav';
import Articles from '@/components/Articles';


export default {
  data() {
    return {
      type: 'news',
      main_title: 'Новости',
    };
  },
  components: {
    Articles,
    LeftNav,
  },
};
</script>

<style >
#news{
  background-color: rgb(255, 255, 110);
  color: black;
}

</style>
