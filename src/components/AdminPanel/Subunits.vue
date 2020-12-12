<template>
    <section>
        <h1>Подразделения</h1>
        <ul>
        <Subunit
            v-for="subunit in subunits"
            v-bind:key="subunit.id"
            v-bind:subunit="subunit"
        />
        </ul>
    </section>
</template>

<script>
import HTTP from '../http-common';
import Subunit from './Subunit';

export default {
  components: { Subunit },
  data: () => ({
    subunits: {},
  }),
  created() {
    this.getSubunits();
  },
  methods: {
    getSubunits() {
      HTTP.get('/subunit/multiple').then((response) => {
        this.subunits = response.data;
      });
    },
  },
};
</script>

<style  scoped>
ul{
    padding: 0;
}
</style>
