const searchBtn = document.getElementById("search-btn");
const searchForm = document.querySelector(".app-header-search");
const searchList = document.getElementById("search-list");
import { PUBLIC_KEY, HASH } from "./config.js";

const getInputValue = (event) => {
  event.preventDefault();
  let searchText = searchForm.search.value;
  fetchAllSuperHero(searchText);
};

searchForm.addEventListener("submit", getInputValue);

const fetchAllSuperHero = async (searchText) => {
  let url = `https://gateway.marvel.com/v1/public/characters?ts=1683909017&apikey=${PUBLIC_KEY}&hash=${HASH}&nameStartsWith=${searchText}`;

  try {
    const response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    data = data.data;
    console.log(data.results);
    showSearchList(data.results);
  } catch (err) {
    console.log(err);
  }
};

const showSearchList = (data) => {
  if (data.length === 0) {
    searchList.style.visibility = "hidden";
  } else {
    searchList.style.visibility = "visible";
    searchList.innerHTML = "";
    data.forEach((hero) => {
      let html = `<div class="card">
      <img
        src="${hero.thumbnail["path"] + "." + hero.thumbnail["extension"]}"
        alt="${hero.name}"
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title">${hero.name}</h5>
        <button class="favorite-button" data-id="fav-${hero.id}" data-name="${
        hero.name
      }" data-img="${hero.thumbnail.path}.${hero.thumbnail.extension}">
        <i class="fa-sharp fa-solid fa-heart ${
          isFavorite(hero.id) ? "liked" : ""
        }"></i>
        </button>
        <a href="./supeheroDetails/SuperheroPage.html?id=${
          hero.id
        }" class="btn btn-primary">Know me better</a>
      </div>
    </div>
      `;
      searchList.insertAdjacentHTML("afterbegin", html);
    });

    // Add an event listener to the favourite button
    const favoriteButtons = searchList.querySelectorAll(".favorite-button");

    //toggling like button
    favoriteButtons.forEach((btn) => {
      btn.addEventListener("click", handleFavouriteClick);
    });
  }
};

function isFavorite(superheroId) {
  const favouriteSuperheroes =
    JSON.parse(localStorage.getItem("favouriteSuperheroes")) || [];

  return favouriteSuperheroes.includes(`fav-${superheroId}`);
}

function handleFavouriteClick(event) {
  // By using event.currentTarget, you will be able to access the button element itself,
  // regardless of which child element was clicked within the button.
  let button = event.currentTarget;
  const heartIcon = button.querySelector("i.fa-heart");

  const superheroId = button.dataset.id;
  const superheroName = button.dataset.name;
  const superheroImage = button.dataset.img;

  let favouriteSuperheroes =
    JSON.parse(localStorage.getItem("favouriteSuperheroes")) || [];

  const isFavorite = favouriteSuperheroes.includes(superheroId);

  if (!isFavorite) {
    favouriteSuperheroes.push(superheroId);
    heartIcon.classList.add("liked");
  } else {
    const index = favouriteSuperheroes.indexOf(superheroId);
    if (index > -1) {
      favouriteSuperheroes.splice(index, 1);
    }
    heartIcon.classList.remove("liked");
  }

  localStorage.setItem(
    "favouriteSuperheroes",
    JSON.stringify(favouriteSuperheroes)
  );
  console.log(localStorage);

  //show Notification
  showNotificationToast(superheroName, superheroImage, !isFavorite);
}

//show Notification Function
function showNotificationToast(
  superheroName,
  superheroImage,
  isAddedToFavorite
) {
  const toast = document.getElementById("liveToast");
  const toastImage = toast.querySelector(".toast-header .rounded");
  const toastHeader = toast.querySelector(".toast-header");
  const toastBody = toast.querySelector(".toast-body");

  toastImage.src = superheroImage;
  if (isAddedToFavorite) {
    toastBody.textContent = `${superheroName} has been added to favourites!!!`;
    toastHeader.classList.remove("bg-danger");
    toastHeader.classList.add("bg-success");
    toastHeader.children[1].textContent = `${superheroName}`;
  } else {
    toastBody.textContent = `${superheroName} has been removed to favourites!!!`;
    toastHeader.classList.remove("bg-success");
    toastHeader.classList.add("bg-danger");
    toastHeader.children[1].textContent = `${superheroName}`;
  }

  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
}

searchForm.search.addEventListener("keyup", () => {
  const searchText = searchForm.search.value;
  if (searchText.length > 2) {
    searchList.style.visibility = "visible";
    fetchAllSuperHero(searchText);
  } else {
    searchList.style.visibility = "hidden";
    searchList.innerHTML = "";
  }
});
