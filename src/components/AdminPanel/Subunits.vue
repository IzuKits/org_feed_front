<template>
    <section>
        <h1>Подразделения</h1>
        <ul>
        <Subunit
            v-for="subunit in subunits"
            v-bind:key="subunit.id"
            v-bind:subunit="subunit"
            v-bind:role="role"
        />
        </ul>
    </section>
</template>

<script>
import HTTP from '../http-common';
import Subunit from './Subunit';
import { getRole } from '../../main';

export default {
  components: { Subunit },
  data: () => ({
    subunits: {},
    role: '',
  }),
  created() {
    this.getSubunits();
    getRole((r) => { this.role = r; });
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
