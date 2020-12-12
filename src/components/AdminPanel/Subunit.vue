<template>
<li>
    <router-link v-bind:to="'/admin/subunit/posts/' + subunit.id">
        <div class="wrapper">
            {{subunit.name}}
        </div>
    </router-link>
</li>
</template>

<script>
export default {
  props: {
    subunit: {},
  },
};
</script>

<style  scoped>
.wrapper {
    text-align: left;
    margin: 1rem 0;
    font-size: 1.2rem;
    padding: 0.5rem;
    border: 1px solid rgb(59, 59, 59);
}
li {
    list-style: none;
}
a{
    text-decoration: none;
    color: black;
}
</style>
