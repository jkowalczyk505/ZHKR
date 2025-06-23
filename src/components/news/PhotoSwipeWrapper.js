import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

let lightbox;

export const openLightbox = (items, index = 0) => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }

  lightbox = new PhotoSwipeLightbox({
    pswpModule : () => import('photoswipe'),
    dataSource : items,          // [{ src, width, height }]
    showHideAnimationType: 'zoom',
  });

  lightbox.init();
  lightbox.loadAndOpen(index);
};
