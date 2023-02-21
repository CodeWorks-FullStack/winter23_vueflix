<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <h1>Movies</h1>
        <form @submit.prevent="searchMovies()">
          <div class="input-group mb-3 me-3">
            <input v-model="editable.query" required type="text" class="form-control" placeholder="Search movies"
              aria-label="Search movies" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
              <i class="mdi mdi-magnify mdi-spin"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <button @click="changePage(currentPage - 1)" class="btn" :disabled="currentPage == 1"
          :class="{ 'btn-outline-danger': currentPage == 1, 'btn-outline-dark': currentPage > 1 }">Previous
          Page</button>
        <div class="fs-3 mx-4">{{ currentPage }} of {{ totalPages }}</div>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages"
          :class="`btn ${currentPage == totalPages ? 'btn-outline-danger' : 'btn-outline-dark'} `">Next
          Page</button>
      </div>
    </div>
    <div class="row">
      <div v-for="movieFromTheVFor in movies" class="col-md-3 p-4">
        <!-- NOTE :movie is the name of our prop in the child component(MovieCard) -->
        <!-- NOTE movieFromTheVFor becomes the value of that prop -->
        <MovieCard :movie="movieFromTheVFor" />
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js'
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import MovieCard from '../components/MovieCard.vue';

export default {
  setup() {
    // PRIVATE
    const editable = ref({});
    async function getMovies() {
      try {
        await moviesService.getMovies();
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error);
      }
    }
    // NOTE this runs when the home page is loaded, think of it like a constructor in your controllers
    onMounted(() => {
      logger.log("Sup from the home page");
      getMovies();
    });
    return {
      // PUBLIC
      // NOTE Computed is how we talk to our appState, and have it update the page accordingly
      editable,
      movies: computed(() => AppState.movies),
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      async changePage(pageNumber) {
        try {
          // NOTE check to see if there is a query being stored in the AppState, and call the correct method
          if (AppState.query) {
            await moviesService.changePageWithQuery(pageNumber);
          }
          else {
            await moviesService.changePage(pageNumber);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async searchMovies() {
        try {
          let searchData = editable.value;
          await moviesService.searchMovies(searchData);
          editable.value = {};
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { MovieCard }
}
</script>

<style scoped lang="scss"></style>
