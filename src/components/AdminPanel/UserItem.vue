<template>
    <router-link v-bind:to="'/admin/userprofile/' + user.id">
        <p>{{user.full_name}}</p>
    </router-link>
</template>

<script>
export default {
  props: {
    user: {},
  },
};
</script>

<style  scoped>
a{
    margin: 1rem 0;
    text-align: left;
    padding-left: 1rem;
    color: rgb(59, 59, 59);
    text-decoration: none;
    display: block;
}
a:hover{
    background-color: rgb(206, 206, 206);
    cursor: pointer;
}
p{
    margin: 0rem;
    padding: 0.5rem;
}
</style>
