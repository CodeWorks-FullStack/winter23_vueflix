import { AppState } from "../AppState.js"
import { Movie } from "../models/Movie.js"
import { logger } from "../utils/Logger.js"
import { movieApi } from "./AxiosService.js"

class MoviesService {
  async getMovies() {
    const res = await movieApi.get('discover/movie')
    logger.log('getting movies', res.data)
    AppState.movies = res.data.results.map(m => new Movie(m))
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }

  async changePage(pageNumber) {
    const res = await movieApi.get('discover/movie', { params: { page: pageNumber } })
    logger.log('changing page', res.data)
    AppState.movies = res.data.results.map(m => new Movie(m))
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }

  async changePageWithQuery(pageNumber) {
    // NOTE get our query from our AppState to pass to the api as a parameter
    const res = await movieApi.get('search/movie', { params: { page: pageNumber, query: AppState.query } })
    logger.log('changing page', res.data)
    AppState.movies = res.data.results.map(m => new Movie(m))
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }

  async getMovieById(movieId) {
    const res = await movieApi.get('movie/' + movieId)
    logger.log('getting movie by id', res.data)
    AppState.movie = new Movie(res.data)
  }

  async searchMovies(searchData) {
    const res = await movieApi.get('search/movie', { params: searchData })
    logger.log('searching api', res.data)
    // NOTE Store our query in the appState so that we can use it in our change page method
    AppState.query = searchData.query
    AppState.movies = res.data.results.map(m => new Movie(m))
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }
}

export const moviesService = new MoviesService()