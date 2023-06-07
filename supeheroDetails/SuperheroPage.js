//getting superhero id from url
const urlParams = new URLSearchParams(window.location.search);
const superheroId = urlParams.get("id");
import { PUBLIC_KEY, HASH } from "../config.js";

//fetch Superhero info
async function fetchSuperHero() {
  let url = `https://gateway.marvel.com/v1/public/characters/${superheroId}?ts=1683909017&apikey=${PUBLIC_KEY}&hash=${HASH}`;

  const response = await fetch(url);
  const data = await response.json();
  const superhero = data.data.results[0];
  return superhero;
}

//display superhero details
async function displaySuperHeroDetails() {
  const superhero = await fetchSuperHero();

  document.getElementById(
    "header"
  ).innerHTML = ` <h2 class="text-center">${superhero.name}</h2>`;

  //set the superhero thumbnail image
  const img = document.getElementById("img-container");
  img.innerHTML = `<img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="superhero thumbnail" class="img-fluid">`;
  //set the superhero description
  const description = document.getElementById("description");
  description.innerHTML = `<h5 class="card-title mt-3 text-warning">${
    superhero.name
  }</h5>
  <div class="card-text text-info">
  ${
    isDescription(superhero)
      ? superhero.description
      : "<p class='text-white-50 fs-6'>Description not available.</p>"
  }
  </div>`;

  //Set the number of comics available
  const comics = document.getElementById("comics");
  comics.innerHTML = `<h5 class="card-title mt-3 text-warning">Comics available : ${superhero.comics.available}</h5>
  <div class="card-text text-info" id="comic-list"></div>`;

  //display comics
  const comicList = document.getElementById("comic-list");
  const comicsArray = superhero.comics.items.slice(0, 20); //get the 20 comics
  comicsArray.forEach((comic) => {
    comicList.innerHTML += `<a href="./comic.html?id=${comic.resourceURI}" class="list-group-item list-group-item-action">${comic.name}</a>`;
  });

  //Set the number of series available
  const series = document.getElementById("series");
  series.innerHTML = `<h5 class="card-title mt-3 text-warning">Series available : ${superhero.series.available}</h5>
  <div class="card-text text-info" id="series-list"></div>`;

  //   display series
  const seriesList = document.getElementById("series-list");
  const seriesArray = superhero.series.items.slice(0, 20); //get the 20 series
  seriesArray.forEach((series) => {
    seriesList.innerHTML += `<a href="./series.html?id=${series.resourceURI}" class="list-group-item list-group-item-action">${series.name}</a>`;
  });

  //Set the number of stories available
  const stories = document.getElementById("stories");
  stories.innerHTML = `<h5 class="card-title mt-3 text-warning">Stories available : ${superhero.stories.available}</h5>
  <div class="card-text text-info" id="stories-list"></div>`;

  //   display stories
  const storiesList = document.getElementById("stories-list");
  const storiesArray = superhero.stories.items.slice(0, 20); //get the 20 stories
  storiesArray.forEach((story) => {
    storiesList.innerHTML += `<a href="./story.html?id=${story.resourceURI}" class="list-group-item list-group-item-action">${story.name}</a>`;
  });

  //Set the number of events available
  const events = document.getElementById("events");
  events.innerHTML = `<h5 class="card-title mt-3 text-warning">Events available : ${superhero.events.available}</h5>
  <div class="card-text text-info" id="events-list"></div>`;

  //   display events
  const eventsList = document.getElementById("events-list");
  const eventsArray = superhero.events.items.slice(0, 20); //get the 20 events
  eventsArray.forEach((event) => {
    eventsList.innerHTML += `<a href="./event.html?id=${event.resourceURI}" class="list-group-item list-group-item-action">${event.name}</a>`;
  });
}

function isDescription(superhero) {
  return superhero.description && superhero.description.length > 0;
}

displaySuperHeroDetails();
