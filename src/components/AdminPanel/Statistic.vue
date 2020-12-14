/* eslint-disable no-restricted-syntax */
<template>
    <section>
        <h2>Статистика</h2>
        <div class="form_wrapper">
            <p>Введите временной промежуток</p>
            <p><span class="m">С</span>
                <select v-model="month_from" required>
                    <option
                    v-for="month in month_options"
                    v-bind:key="month.value"
                    v-bind:value="month.value">
                        {{month.text}}
                    </option>
                </select>
                <input type="number" v-model="year_from" min="2000" max="2100" placeholder="Год">
                <span class="m">до</span>
                <select v-model="month_to" required>
                    <option
                    v-for="month in month_options"
                    v-bind:key="month.value"
                    v-bind:value="month.value">
                        {{month.text}}
                    </option>
                </select>
                <input type="number" v-model="year_to" min="2000" max="2100" placeholder="Год">
            </p>
            <p>
                <select v-model="subunits" id="" multiple required>
                    <option
                    v-for="subunit in subunit_options"
                    v-bind:key="subunit.value"
                    v-bind:value="subunit.value"
                    >
                        {{subunit.text}}
                    </option>
                </select>
            </p>
            <div class="button" v-on:click="showStatistics">Показать</div>
        </div>
        <h3>Статистика</h3>
        <table v-bind="table">
            <tr>
                <th></th>
                <th v-for="h in headers" v-bind:key="h">
                    {{h}}
                </th>
            </tr>
            <tr v-for="item in table_object" v-bind:key="item.name">
                <th>{{item.name}}</th>
                <td v-for="num in item.row" v-bind:key="num">
                    {{num}}
                </td>
            </tr>
        </table>
    </section>
</template>

<script>
/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable-next-line guard-for-in */
/* eslint-disable-next-line no-restricted-syntax */
import HTTP from '../http-common';

export default {
  data: function func() {
    return {
      month_from: 1,
      year_from: '',
      month_to: 1,
      year_to: '',
      month_options: [
        { text: 'Январь', value: 1 },
        { text: 'Февраль', value: 2 },
        { text: 'Март', value: 3 },
        { text: 'Апрель', value: 4 },
        { text: 'Май', value: 5 },
        { text: 'Июнь', value: 6 },
        { text: 'Июль', value: 7 },
        { text: 'Август', value: 8 },
        { text: 'Сентябрь', value: 9 },
        { text: 'Октябрь', value: 10 },
        { text: 'Ноябрь', value: 11 },
        { text: 'Декабрь', value: 12 },
      ],
      subunits: [],
      subunit_options: [],
      table_object: [],
      headers: [],
    };
  },
  created() {
    this.getSubunitOptions();
  },
  methods: {
    showStatistics() {
      this.table_object = [];
      const query_params = this.getdataQuery();
      HTTP.get('/post/statistics?'.concat(query_params).concat('&ids=')
        .concat(this.subunits.join(',')))
        .then((response) => {
          this.preparationData(response.data);
        });
    },
    preparationData(data) {
      if (data.length === 0) {
        return;
      }
      this.headers = Object.keys(data);
      const datas = [];
      const dates = Object.keys(data[this.headers[0]]);
      for (let k = 0; k < dates.length; k += 1) {
        const obj = {};
        obj.name = dates[k];
        obj.row = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const sub of this.headers) {
          obj.row.push(data[sub][dates[k]]);
        }
        datas.push(obj);
      }
      this.table_object = datas;
    },
    getdataQuery() {
      let str = '';
      str += 'start_year='.concat(this.year_from);
      str += '&start_month='.concat(this.month_from);
      str += '&end_year='.concat(this.year_to);
      str += '&end_month='.concat(this.month_to);
      return str;
    },
    getSubunitOptions() {
      HTTP.get('/subunit/multiple').then((response) => {
        const subunits = response.data;
        // eslint-disable-next-line no-restricted-syntax
        for (const iterator of subunits) {
          const obj = {};
          obj.value = iterator.id;
          obj.text = iterator.name;
          this.subunit_options.push(obj);
        }
      });
    },
  },
  computed: {
    table: function func() {
      return {
        table: this.table_object === [],
      };
    },
  },
};
</script>

<style scoped>
.form_wrapper{
    border: 1px solid black;
    padding: 1rem;
}
p, .form_wrapper{
    text-align: left;
}
.button{
    background-color: rgb(59, 59, 59);
    padding: 1rem;
    color: white;
    text-align: center;
}
.button:hover{
    cursor: pointer;
    background-color: rgb(243, 243, 79);
    color: black;
    transition-duration: 200ms;
}
span.m{
    margin: 1rem;
}
table{
    border-collapse: collapse;
    width: 100%;
}
.table{
    display: none;
}
th, td{
    border: 1px solid black;
    padding: 0.5rem;
}
</style>
