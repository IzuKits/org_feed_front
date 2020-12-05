<template>
    <div>
        <HeaderNav />
        <Articles :main_title='main_title' />
    </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav';
import Articles from '@/components/Articles';

export default {
  data() {
    return {
      main_title: 'Объявления',
    };
  },
  components: {
    HeaderNav,
    Articles,
  },

};
</script>

<style >
#announ{
  background-color: rgb(255, 255, 110);
  color: black;
}
</style>
