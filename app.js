const form = document.getElementById('movie-form');
const apiKey = 'ad7ef549b9a6fdbb99f3581ba04b9bee';
const moviesList = document.getElementById('movies-list');

form.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e) {
  e.preventDefault();
  const genre = document.getElementById('genre').value;
  const rating = document.getElementById('rating').value;
  const year = document.getElementById('year').value;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`;
  if (year) {
    url += `&primary_release_year=${year}`;
  }
  clearList();
  loadingMessage();
  getRecommendations(url, moviesList);
}

function clearList() {
  moviesList.innerHTML = '';
}

function loadingMessage() {
  const loadingText = document.createElement('li');
  loadingText.textContent = 'Loading recommendations...';
  moviesList.appendChild(loadingText);
}

function getRecommendations(url, moviesList) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      clearList();
      if (data.results.length > 0) {
        data.results.forEach(movie => {
          const li = document.createElement('li');
          const movieImg = document.createElement('img');
          movieImg.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/100x150?text=No+Image';
          movieImg.alt = `${movie.title} Poster`

          const movieInfo = document.createElement('div');
          const movieTitle = document.createElement('p');
          movieTitle.id = 'movieTitle'
          movieTitle.textContent = `${movie.title}`
          const movieReleaseDate = document.createElement('p');
          movieReleaseDate.id = 'movieReleaseDate'
          movieReleaseDate.textContent = `${movie.release_date.split('-')[0]}`
          const movieRating = document.createElement('p');
          movieRating.id = 'movieRating'
          movieRating.textContent = `⭐ ${movie.vote_average}`

          movieInfo.appendChild(movieTitle);
          movieInfo.appendChild(movieReleaseDate);
          movieInfo.appendChild(movieRating);

          li.appendChild(movieImg);
          li.appendChild(movieInfo);

          moviesList.appendChild(li);
        })
      }
      else {
        const li = document.createElement('li');
        li.textContent = 'No recommendations found for the selected criteria.';
        moviesList.appendChild(li);
      }
    })
    .catch(error => {
      clearList();
      console.error('Error fetching recommendations...', error);
      errorMessage(moviesList);
    })
}

function errorMessage(moviesList) {
  const li = document.createElement('li');
  li.textContent = 'Error fetching recommendations. Please try again later.';
  moviesList.appendChild(li);
}