import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import ButtonService from "./js/pixabay-api.js";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".card-list");
const buttonMore = document.querySelector(".load-more");


buttonMore.style.display = "none";


const loader = document.createElement("p");
loader.textContent = "Loading...";
loader.style.display = "none";
loader.style.fontSize = "16px";
loader.style.fontWeight = "bold";
loader.style.textAlign = "center";
loader.style.marginTop = "10px";


const loadMoreBtn = new ButtonService(buttonMore, "is-hidden");

const params = {
  page: 1,
  perPage: 15,
  q: "",
  maxPage: 0,
};

buttonMore.insertAdjacentElement("afterend", loader);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
    });
    return;
  }

  params.q = query;
  params.page = 1;
  clearGallery();
  loader.style.display = "block";
  buttonMore.style.display = "none";

  fetchImages(query, params.page, params.perPage)
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        iziToast.error({
          title: "Error",
          message: "Sorry, no images found! Please try again.",
        });
        return;
      }
      renderGallery(hits);
      params.maxPage = Math.ceil(totalHits / params.perPage);

      if (params.page < params.maxPage) {
        buttonMore.style.display = "block";
      }
    })
    .catch(() => {
      iziToast.error({
        title: "Error",
        message: "An error occurred while fetching images. Please try again!",
      });
    })
    .finally(() => {
      loader.style.display = "none";
    });
});

buttonMore.addEventListener("click", () => {
  params.page += 1;
  loader.style.display = "block";
  buttonMore.style.display = "none"; 

  fetchImages(params.q, params.page, params.perPage)
    .then(({ hits }) => {
      if (hits.length === 0 || params.page >= params.maxPage) {
        iziToast.error({
          title: "Error",
          message: "No more images available.",
        });
        buttonMore.style.display = "none";
        return;
      }

      renderGallery(hits);
      smoothScroll();

      if (params.page < params.maxPage) {
        buttonMore.style.display = "block";
      } else {
        buttonMore.style.display = "none";
      }
    })
    .catch(() => {
      iziToast.error({
        title: "Error",
        message: "An error occurred while fetching images. Please try again!",
      });
    })
    .finally(() => {
      loader.style.display = "none";
    });
});


function smoothScroll() {
  const firstCard = document.querySelector(".gallery-item");
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2, 
      behavior: "smooth",
    });
  }
}