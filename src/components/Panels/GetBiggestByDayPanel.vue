<template>
    <div class="biggest_wrapper">
          <p>Самый большой пост</p>
          <label for="d">День</label>
          <input type="date" name="" id="d" v-model="date">
          <br>
          <label for="ch">Учитывая посты в архиве?</label>
          <input type="checkbox" name="" id="ch" v-model="archive">
          <br>
          <div class="button" v-on:click="Submit">Получить</div>
          <div class="button" v-on:click="Cancel">Отмена</div>
      </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  data() {
    return {
      date: '',
      archive: false,
    };
  },
  methods: {
    Submit() {
      if (this.date !== '') {
        eventBus.$emit('get_biggest_post', {
          date: this.date,
          archive: this.archive,
        });
      }
    },
    Cancel() {
      eventBus.$emit('get_biggest_post', {
        date: '',
      });
    },
  },
};
</script>

<style scoped>
p{
    font-weight: bold;
}
.biggest_wrapper{
    text-align: left;
    margin: 2rem;
}
.biggest_wrapper > label,
.biggest_wrapper > input{
    display: inline-block;
    margin: 0.5rem 1rem;
}
.button{
    margin: 1rem;
    padding: 1rem;
    background-color: rgb(59, 59, 59);
    color: white;
    display: inline-block;
}
.button:hover{
    background-color: rgb(177, 177, 177);
    color: black;
    transition-duration: 200ms;
    cursor: pointer;
}
</style>
