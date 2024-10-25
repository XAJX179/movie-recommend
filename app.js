const form = document.getElementById('movie-form');
const genre = document.getElementById('genre')
const rating = document.getElementById('rating')
const year = document.getElementById('year')
const apikey = 'ad7ef549b9a6fdbb99f3581ba04b9bee'
const moviesList = document.getElementById('movies-list');

const loadingText = document.createElement('li');

form.addEventListener('submit', (e) => handle_submit(e))

function handle_submit(e) {
  e.preventDefault();
  clear_list();
  loading_text();
}

function clear_list() {
  moviesList.innerText = '';
}

function loading_text() {
  loadingText.textContent = 'Loading recommendations...';
  moviesList.appendChild(loadingText);
}