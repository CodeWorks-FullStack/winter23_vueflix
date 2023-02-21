
export class Movie {
  constructor (data) {
    this.id = data.id
    this.originalTitle = data.original_title
    this.overview = data.overview
    this.releaseDate = data.release_date
    this.title = data.title
    this.backdropImg = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    this.posterImg = `https://image.tmdb.org/t/p/original${data.poster_path}`
    this.budget = data.budget || 0
    this.revenue = data.revenue || 0
    this.genres = data.genres || []
    this.imdbLink = data.imdb_id ? `https://www.imdb.com/title/${data.imdb_id}/` : null
    this.tagline = data.tagline || null
    this.runtime = data.runtime || null
  }
}