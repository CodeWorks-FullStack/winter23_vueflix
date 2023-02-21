<template>
  <router-link :to="{ name: 'MovieDetails', params: { movieId: movie.id } }">
    <img :src="movie.posterImg" :alt="movie.title + ' image'" class="img-fluid rounded selectable">
  </router-link>
  <h2>
    {{ movie.title }}
  </h2>
</template>


<script>
import { Movie } from '../models/Movie.js';

export default {
  // NOTE props allow us to pass down data from a parent component
  props: {
    movie: { type: Movie }
  },
  setup() {
    return {};
  },
}
</script>


<style lang="scss" scoped></style>