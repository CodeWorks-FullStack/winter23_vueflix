<template>
  <div class="container-fluid movie-bg">
    <div class="row mb-3">
      <div class="col-12">
        <h1>Movie Details</h1>

      </div>
    </div>
    <!-- NOTE v-if will only render this html if there is a movie in the AppState, otherwise this will throw errors -->
    <div v-if="movie" class="row pt-3">
      <div class="col-12">
        <div class="movie-card p-4 rounded">
          <h2 class="mb-3">
            {{ movie.title }}
          </h2>
          <h3 class="mb-3">
            <span>
              Budget: {{ movie.budget }}

            </span>
            <span class="mx-2">
              Revenue: {{ movie.revenue }}
            </span>
            <span
              :class="{ 'text-danger': movie.revenue - movie.budget < 0, 'text-success': movie.revenue - movie.budget > 0 }">
              Profit: {{ movie.revenue - movie.budget }}
            </span>
          </h3>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { moviesService } from '../services/MoviesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()

    async function getMovieById() {
      try {
        const movieId = route.params.movieId
        // logger.log(movieId)
        await moviesService.getMovieById(movieId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }


    onMounted(() => {
      getMovieById()
    })
    return {
      movie: computed(() => AppState.movie),
      // NOTE                                           vvv elvis operator says to only drill into AppState.movie if it has properties
      backdropImage: computed(() => `url(${AppState.movie?.backdropImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.movie-bg {
  // NOTE how to bring data from our script in to our style tag
  background-image: v-bind(backdropImage);
  height: 90vh;
  background-size: cover;
}

.movie-card {
  background-color: rgba(255, 255, 255, 0.099);
}

* {
  text-shadow: 2px 2px 5px white;
}
</style>