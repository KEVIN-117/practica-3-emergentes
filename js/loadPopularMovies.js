const API_KEY = "020f573e5c6e5eec0430a5ea7fd78434";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjBmNTczZTVjNmU1ZWVjMDQzMGE1ZWE3ZmQ3ODQzNCIsInN1YiI6IjY1NzRmNDYzNGJmYTU0MDEzODdmNGM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cL5q_2WhzeSL3L49uADnzfZ4bVF_tfgLUXEt1Z0rbL4";

const container = document.getElementById("popular-movies");
// https://api.themoviedb.org/3/movie/popular?api_key=020f573e5c6e5eec0430a5ea7fd78434
async function fetchData(route) {
  const API_URL = `https://api.themoviedb.org/3/${
    route ? route : "movie/popular"
  }`;
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await res.json();
  return data;
}

async function loadPopularMovies() {
  const data = await fetchData();
  const movies = data.results;
  movies.forEach((movie) => {
    const { backdrop_path, poster_path, title, id } = movie;
    const children = document.createElement("div");
    children.className =
      "relative rounded-md shadow-lg snap-center shrink-0 h-[70vh] w-full bg-white flex flex-col shadow-xl shadow-indigo-500/50 rounded-xl overflow-hidden cursor-pointer";

    children.style.background = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
    children.style.backgroundSize = "cover";
    children.style.backgroundPosition = "center";
    children.addEventListener("click", () => {
      loadMovieView(id);
      document.getElementById("movie-details").scrollIntoView({
        behavior: "smooth",
      })
    });
    children.innerHTML = `
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
    container.appendChild(children);
    getMovieData(id);
  });
}

loadPopularMovies();

async function getMovieData(idM) {
  const getMovie = await fetchData(`movie/${idM}`);
  const { genres, id } = getMovie;
  const element = document.getElementById(`genres${id}`);
  if (idM === id) {
    genres.forEach((genre) => {
      element.innerHTML += `<span class="px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 text-white rounded-lg">${genre.name}</span>`;
    });
  }
}

function mapper(data, element, type) {
  const container = document.getElementById(element);
  switch (type) {
    case "genres":
      mapGenres(data, container);

    case "production_companies":
      mapProductionCompanies(data, container);
  }
}

function mapGenres(data, element) {
  data.forEach((genre) => {
    const genreElement = document.createElement("span");
    genreElement.className =
      "px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 text-white rounded-lg";
    genreElement.innerText = genre.name;
    element.appendChild(genreElement);
  });
}

function mapProductionCompanies(data, element) {
  data.forEach((company) => {
    const companyElement = document.createElement("span");
    companyElement.className =
      "px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 text-white rounded-lg";
    companyElement.innerText = company.name;
    element.appendChild(companyElement);
  });
}

async function loadMovieView(movieId) {
  const movie = await fetchData(`movie/${movieId}`);
  const { id, cast } = await fetchData(`movie/${movieId}/credits`);
  const {
    title,
    overview,
    genres,
    production_companies,
    backdrop_path,
    poster_path,
  } = movie;
  const container = document.getElementById("movie-details");
  container.innerHTML = `
         <div  class="relative h-auto w-full text-white" style="
        background-image: linear-gradient(360deg, rgba(0, 0, 0, 0.479) 35.27%, rgba(0, 0, 0, 0) 70.17%), url(https://image.tmdb.org/t/p/original/${backdrop_path});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      "
            >
                <div class="header-section w-[100%] mx-auto pt-96 py-10 px-10">
                    <img class="poster w-30 h-96 object-cover rounded-md" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="">

                    <h1 class=" text-5xl font-extrabold my-7 title uppercase">${title}</h1>
                    <ul class="flex gap-2">
                        <li>20 episodes</li>
                        <li>2024</li>
                        <li>Fantasy</li>
                        <li>Actions</li>
                    </ul>
                    <div class="flex md:flex-row flex-col justify-between items-center gap-10 md:gap-0 my-4">
                        <div class="flex md:flex-row flex-col gap-10">
                            <button class="flex px-10 py-3 rounded-full bg-indigo-500/100">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                    d="M10.3 5.6A2 2 0 0 0 7 7v10a2 2 0 0 0 3.3 1.5l5.9-4.9a2 2 0 0 0 0-3l-6-5Z"
                                    clip-rule="evenodd" />
                            </svg>
                            Continue Watching</button>
                        <button class="flex px-10 py-3  rounded-full border border-indigo-500/100">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                            </svg>
                            Add Watchlist
                        </button>
                    </div>
                    <div class="flex md:flex-row flex-col gap-10">
                            <button class="flex px-10 py-3  rounded-full border border-indigo-500/100">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                                </svg>
                                Download
                            </button>
                            <button class="flex px-10 py-3  rounded-full border border-indigo-500/100">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                        d="m8 10.9 7-3.2m-7 5.4 7 3.2M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                Share
                            </button>
                            <button class="flex px-10 py-3  rounded-full border border-indigo-500/100">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M15 9.7h4a2 2 0 0 1 1.6.9 2 2 0 0 1 .3 1.8l-2.4 7.2c-.3.9-.5 1.4-1.9 1.4-2 0-4.2-.7-6.1-1.3L9 19.3V9.5A32 32 0 0 0 13.2 4c.1-.4.5-.7.9-.9h1.2c.4.1.7.4 1 .7l.2 1.3L15 9.7ZM4.2 10H7v8a2 2 0 1 1-4 0v-6.8c0-.7.5-1.2 1.2-1.2Z"
                                        clip-rule="evenodd" />
                                </svg>
                                Like
                            </button>

                        </div>
                    </div>
                    <div>
                        <h2 class="text-5xl font-extrabold my-7">Story Line</h2>
                        <p class="text-justify line-clamp-3 overview">${overview}</p>
                    </div>
                    <div class="h-auto">
                        <h2 class="text-5xl font-extrabold ">Casting</h2>
                        <div class="relative w-[90%] h-auto mx-auto flex gap-6 snap-x snap-mandatory overflow-x-auto my-20 px-6 setSclollbar rounded-md" id="cast-${id}">                  
                            
                        </div>
                    </div>
                </div>
            </div>
    `;
  loadCredits(cast, id);
}

function loadCredits(cast, id) {
  const container = document.getElementById(`cast-${id}`);
  

  cast.forEach(async (actor) => {
    const { id, name, profile_path, character } = actor;
    const {birthday, place_of_birth, also_known_as} = await fetchData(`person/${id}`);

    let dateFormat = new Date(birthday);
    const day = translateDay(dateFormat.getDay());
    const month = translateMonth(dateFormat.getMonth());
    const year = dateFormat.getFullYear();
    dateFormat = `${day} ${dateFormat.getDate()} de ${month} de ${year}`;
    if (profile_path) {
      const children = document.createElement("figure");
      children.className = "snap-always flex snap-center shrink-0 w-[50%] h-80 rounded-xl set-box-shadow-2 set-bg-opacity";
      children.innerHTML = `
        <img class="w-90 h-80 object-cover rounded-lg " src="https://image.tmdb.org/t/p/original/${profile_path}">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4 truncate">
            <figcaption class="font-medium">
                <div class="text-sky-500 dark:text-sky-400">
                    <span class="text-slate-700 dark:text-slate-500">Nombre: </span>
                    ${name}
                </div>
                <div class="text-sky-500 dark:text-sky-400">
                    <span class="text-slate-700 dark:text-slate-500">Personaje: </span>
                    ${character}
                </div>
                <div class="text-sky-500 dark:text-sky-400">
                    <span class="text-slate-700 dark:text-slate-500">cumpleaños: </span>
                    ${dateFormat}
                </div>
                <div class="text-sky-500 dark:text-sky-400">
                    <span class="text-slate-700 dark:text-slate-500">Lugar de nacimiento: </span>
                    ${place_of_birth}
                </div>
                <div class="text-sky-500 dark:text-sky-400">
                    <span class="text-slate-700 dark:text-slate-500">También conocido como: <br></span>
                    <span class="flex justify-center items-center">${also_known_as.map((name) => name).join("<br>")}</span>
                </div>
                
            </figcaption>
        </div>            
        `;
      container.appendChild(children);
    }
  });
}



function translateDay(day) {
  switch (day) {
    case 0:
      return "Domingo";
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miercoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
    case 6:
      return "Sabado";
  }
}

function translateMonth(month) {
  switch (month) {
    case 0:
      return "Enero";
    case 1:
      return "Febrero";
    case 2:
      return "Marzo";
    case 3:
      return "Abril";
    case 4:
      return "Mayo";
    case 5:
      return "Junio";
    case 6:
      return "Julio";
    case 7:
      return "Agosto";
    case 8:
      return "Septiembre";
    case 9:
      return "Octubre";
    case 10:
      return "Noviembre";
    case 11:
      return "Diciembre";
  }
}
