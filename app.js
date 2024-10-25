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
  moviesList.innerText = '';
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

      }
      else {
        console.log('nope')
      }
    })
    .catch(error => {
      console.error('Error fetching recommendations...', error);
      errorMessage(moviesList);
    })
}

function errorMessage(moviesList) {
  moviesList.innerHTML = '<li>Error fetching recommendations. Please try again later.</li>';
}