const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=6b789b1582aa7d6f8babaffac322232c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w500`
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=6b789b1582aa7d6f8babaffac322232c&query="`

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// Function to fetch and display movies
async function getMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        showMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display movies
function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date } = movie;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <h3>Release Date</h3>
                ${release_date}
            </div>`;
        main.appendChild(movieElement);
    });
}

// Function to get CSS class based on vote average
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm !== "") {
        getMovies(SEARCH_URL + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
});

// Load movies when the page is initially loaded
window.onload = () => {
    getMovies(API_URL);
};
