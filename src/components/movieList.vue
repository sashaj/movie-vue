<template>
  <div class="movie__list">
    <div v-bind:key="movie.id" v-for="movie in movieList[currentGenre]">
      <movie v-bind:movie="movie" />
    </div>
  </div>
</template>

<script>
import movie from "./movie.vue";

export default {
  name: "movieList",
  components: {
    movie
  },
  props: ["movieList", "currentGenre"]
};
</script>

<style scoped>
</style>