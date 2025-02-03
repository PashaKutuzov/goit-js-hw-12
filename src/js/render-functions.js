import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images, galleryContainer = document.querySelector('.card-list')) {
  // Append new images to the gallery instead of replacing all content
  const markup = images
    .map(
      (image) => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <div class="info">
          <p><strong>Likes:</strong> ${image.likes}</p>
          <p><strong>Views:</strong> ${image.views}</p>
          <p><strong>Comments:</strong> ${image.comments}</p>
          <p><strong>Downloads:</strong> ${image.downloads}</p>
        </div>
      </a>
    `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  // Initialize or refresh the lightbox
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery-item', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery(galleryContainer = document.querySelector('.card-list')) {
  galleryContainer.innerHTML = '';
}
