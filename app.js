const form = document.getElementById('movie-form');
const genre = document.getElementById('genre')
const rating = document.getElementById('rating')
const year = document.getElementById('year')
const apiKey = 'ad7ef549b9a6fdbb99f3581ba04b9bee'
const moviesList = document.getElementById('movies-list');

const loadingText = document.createElement('li');
let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`;
if (year) {
  url += `&primary_release_year=${year}`;
}

form.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e) {
  e.preventDefault();
  clearList();
  loadingMessage();
  getRecommendations();
}

function clearList() {
  moviesList.innerText = '';
}

function loadingMessage() {
  loadingText.textContent = 'Loading recommendations...';
  moviesList.appendChild(loadingText);
}

function getRecommendations() {
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

      }
    })
    .catch(error => {
      console.error('Error fetching recommendations...', error);
      errorMessage();
    })
}

function errorMessage() {
  moviesList.innerHTML = '<li>Error fetching recommendations. Please try again later.</li>';
}