import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Movie.js').Movie[]} */
  movies: [],

  /** @type {import('./models/Movie.js').Movie|null} */
  movie: null,

  /** @type {Number} */
  currentPage: 0,

  /** @type {Number} */
  totalPages: 0,

  /** @type {String|null} */
  query: null
})
