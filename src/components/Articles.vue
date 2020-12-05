<template>
    <main>
        <h1>{{ main_title }}</h1>
        <hr>
        <ul>
            <Article
                v-for="article in articles"
                v-bind:key="article.id"
                v-bind:article="article"
            />
        </ul>
    </main>
</template>

<style scoped>

    h1{
        text-align: left;
    }

    ul{
        padding: 0;
    }
</style>

<script>
import Article from '@/components/Article';

export default {
  props: {
    main_title: {},
    articles: {},
  },
  components: {
    Article,
  },
};
</script>
