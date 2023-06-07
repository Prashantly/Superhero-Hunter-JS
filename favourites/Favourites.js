import { PUBLIC_KEY, HASH } from "../config.js";

//IIFE Module Design Pattern//
const favouriteSuperheroPage = (() => {
  const favoriteList = document.getElementById("favourites-list");

  const fetchSuperHeroData = async (favouriteSuperheroId) => {
    let superheroId = favouriteSuperheroId.substring(4);
    let url = `https://gateway.marvel.com/v1/public/characters/${superheroId}?ts=1683909017&apikey=${PUBLIC_KEY}&hash=${HASH}`;
    const response = await fetch(url);
    const data = await response.json();
    const superhero = data.data.results[0];
    return {
      superHeroId: superhero.id,
      name: superhero.name,
      imageUrl: superhero.thumbnail,
    };
  };

  //Function: Fetch Favourite Super Heroes from the Local Storage//
  const fetchFavouriteSuperHeroes = async () => {
    //Fetch the Favourites from Local Storage
    const favouriteSuperheroes = JSON.parse(
      localStorage.getItem("favouriteSuperheroes")
    );
    //If Favourites Exist in the Local Storage
    if ("favouriteSuperheroes" in localStorage) {
      console.log(favouriteSuperheroes);
      //Loop through the Favourites and add the Super Heroes to the List
      if (favouriteSuperheroes.length > 0) {
        favouriteSuperheroes.forEach(async (favouriteSuperheroId) => {
          //Fetch the Super Hero Data from the API
          const { superHeroId, name, imageUrl } = await fetchSuperHeroData(
            favouriteSuperheroId
          );

          // Create the favourites-list-item div
          let favouritesListItem = document.createElement("div");
          favouritesListItem.classList.add("favourites-list-item");

          let superHeroCard = `
          <div class="card">
            <img
              src="${imageUrl.path}.${imageUrl.extension}"
              alt="${name}"
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <button class="favorite-button" data-id="fav-${superHeroId}" data-name="${name}" data-img="${
            imageUrl.path
          }.${imageUrl.extension}">
                <i class="fa-sharp fa-solid fa-heart ${
                  isFavorite(superHeroId) ? "liked" : ""
                }"></i>
              </button>
            </div>
          </div>
          `;

          // Insert superHeroCard HTML into favouritesListItem
          favouritesListItem.insertAdjacentHTML("beforeend", superHeroCard);

          //insert favouritesListItem in favoriteList
          favoriteList.appendChild(favouritesListItem);

          // Add an event listener to the favourite button
          const favoriteButton =
            favouritesListItem.querySelector(".favorite-button");

          if (favoriteButton) {
            favoriteButton.addEventListener("click", (e) => {
              // Prevent the default button action
              e.preventDefault();
              const button = e.currentTarget;
              const superHeroId = button.dataset.id;

              handleFavoriteButtonClick(superHeroId, button);
            });
          }
        });
      } else {
        // Display a message if no favourites are found
        const favoritesMessage = document.createElement("div");
        favoritesMessage.classList.add("no-fav-item");
        //creating h3 heading inside favoritesMessage
        const favoritesMessageHeading = document.createElement("h3");
        favoritesMessageHeading.classList.add("moving-text");
        favoritesMessageHeading.innerHTML =
          "You haven't added any favourite Superheroes.";
        //appending h3 heading inside favoritesMessage
        favoritesMessage.appendChild(favoritesMessageHeading);
        //appending favoritesMessage to favoritesList
        favoriteList.appendChild(favoritesMessage);
      }
    }
  };

  function handleFavoriteButtonClick(superHeroId, buttonElement) {
    const superheroName = buttonElement.dataset.name;
    const superheroImage = buttonElement.dataset.img;

    // Remove the superhero from the favorites
    const favouriteSuperheroes = JSON.parse(
      localStorage.getItem("favouriteSuperheroes")
    );

    if (favouriteSuperheroes.length > 0) {
      const index = favouriteSuperheroes.indexOf(superHeroId);
      if (index > -1) {
        favouriteSuperheroes.splice(index, 1);
        localStorage.setItem(
          "favouriteSuperheroes",
          JSON.stringify(favouriteSuperheroes)
        );

        //remove card from DOM
        const favoriteListItem = buttonElement.closest(".favourites-list-item");
        favoriteListItem.remove();
        //show Notification
        showNotificationToast(superheroName, superheroImage);
      }
    }
  }

  //checking given superhero id is favuorite or not
  function isFavorite(superheroId) {
    const favouriteSuperheroes =
      JSON.parse(localStorage.getItem("favouriteSuperheroes")) || [];

    return favouriteSuperheroes.includes(`fav-${superheroId}`);
  }

  //show Notification Function
  function showNotificationToast(superheroName, superheroImage) {
    const toast = document.getElementById("liveToast");
    const toastImage = toast.querySelector(".toast-header .rounded");
    const toastHeader = toast.querySelector(".toast-header");
    const toastBody = toast.querySelector(".toast-body");

    toastImage.src = superheroImage;
    toastBody.textContent = `${superheroName} has been removed to favourites!!!`;
    toastHeader.classList.add("bg-danger");
    toastHeader.children[1].textContent = `${superheroName}`;

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }

  // Execute the function to trigger the logic
  fetchFavouriteSuperHeroes();
})();
