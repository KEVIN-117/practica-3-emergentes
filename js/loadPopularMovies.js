"use strict";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "020f573e5c6e5eec0430a5ea7fd78434";

const container = document.getElementById("popular-movies");
// https://api.themoviedb.org/3/movie/popular?api_key=020f573e5c6e5eec0430a5ea7fd78434
async function getData() {
  const res = await fetch(`${API_URL}movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}

async function loadPopularMovies() {
  const data = await getData();
  const movies = data.results;
  movies.forEach((movie) => {
    const { backdrop_path, poster_path, title, id } = movie;
    const movieElement = document.createElement("a");
    movieElement.className =
      "relative rounded-md shadow-lg snap-center shrink-0 h-[70vh] w-full bg-white flex flex-col shadow-xl shadow-indigo-500/50 rounded-xl overflow-hidden";

    movieElement.style.background = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
    movieElement.style.backgroundSize = "cover";
    movieElement.style.backgroundPosition = "center";
    movieElement.href = `./movie.html?id=${id}`;
    movieElement.innerHTML = `
            <div class="absolute inset-0 flex flex-col items-center backdrop-blur-xl top-0 left-0 right-0 bottom-0 rounded-xl overflow-hidden">
                <img class="shrink-0 flex-1 h-[50vh] shadow-xl bg-white object-cover" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="">
                
                <div class="w-full bg-black bg-opacity-50 p-4">
                    <h1 class="text-4xl py-2 px-3 font-bold tracking-tight text-center bottom-0 z-50 text-center">
                            <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Popular
                            ${title}</span>
                    </h1>
                    <div class="text-white text-center" id="genres${id}">
                        
                    </div>
                </div>
            </div>
        `;
    container.appendChild(movieElement);
    getMovieData(id);
  });
  
}

loadPopularMovies();


async function getMovieData(idM){
    const getMovie = await fetch(`${API_URL}movie/${idM}?api_key=${API_KEY}`);
    const {genres, id} = await getMovie.json();
    const element = document.getElementById(`genres${id}`);
    console.log(genres);
    if(idM === id){
        genres.forEach((genre) => {
            element.innerHTML += `<span class="px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 text-white rounded-lg">${genre.name}</span>`;
        });

    }    
}

function mapper(data, element, type){
    const container = document.getElementById(element);
    switch(type){
        case "genres": mapGenres(data, container);

        case "production_companies": mapProductionCompanies(data, container);
    }
}


function mapGenres(data, element){
    data.forEach((genre) => {
        const genreElement = document.createElement("span");
        genreElement.className = "px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 text-white rounded-lg";
        genreElement.innerText = genre.name;
        element.appendChild(genreElement);
    });
}

function mapProductionCompanies(data, element){
    data.forEach((company) => {
        const companyElement = document.createElement("span");
        companyElement.className = "px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 text-white rounded-lg";
        companyElement.innerText = company.name;
        element.appendChild(companyElement);
    });
}

