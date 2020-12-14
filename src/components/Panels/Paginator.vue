<template>
    <section>
        <div v-bind:class="BeforeClass" v-on:click="Before">Назад</div>
        <div class="number">{{page}}</div>
        <div v-bind:class="AfterClass" class="button" v-on:click="Next">Вперед</div>
    </section>
</template>

<script>
import { eventBus } from '../../main';

export default {
  props: {
    page: '',
    max_page: '',
  },
  methods: {
    Next() {
      if (this.page < this.max_page) {
        eventBus.$emit('page', this.page + 1);
      }
    },
    Before() {
      if (this.page > 1) {
        eventBus.$emit('page', this.page - 1);
      }
    },
  },
  computed: {
    BeforeClass: function func() {
      return {
        button: this.page !== 1,
        deactive: this.page <= 1,
      };
    },
    AfterClass: function func() {
      return {
        button: this.page !== this.max_page,
        deactive: this.page >= this.max_page,
      };
    },
  },
};
</script>

<style scoped>
section{
    display: flex;
    justify-content: center;
}
div{
    padding: 1rem;
}
.button{
  background-color: rgb(59, 59, 59);
  color: white;
}
.button:hover{
    cursor: pointer;
    background-color: rgb(177, 177, 177);
    color: black;
    transition-duration: 200ms;
}
.number{
    font-size: 1.2em;
}
div.deactive{
    cursor: default;
    background-color: rgb(177, 177, 177);
    color: black;
}
</style>
