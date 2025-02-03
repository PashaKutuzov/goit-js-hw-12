import axios from 'axios';

const API_KEY = "48505401-41d9a45057075903c793c7a55";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    if (response.data.hits.length === 0) {
      throw new Error("No images found");
    }
    return { hits: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    throw new Error("Failed to fetch images: " + error.message);
  }
}

export default class ButtonService {
  constructor(buttonEl, hiddenClass) {
    this.buttonEl = buttonEl;
    this.hiddenClass = hiddenClass;
  }

  hide() {
    this.buttonEl.classList.add(this.hiddenClass);
  }

  show() {
    this.buttonEl.classList.remove(this.hiddenClass);
  }

  disable() {
    this.buttonEl.disabled = true;
  }

  enable() {
    this.buttonEl.disabled = false;
  }
}
