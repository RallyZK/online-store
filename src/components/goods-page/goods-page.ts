import './goods-page.scss';
import * as types from '../types';
import { createElements } from '../sort/sort';
import { getBuyNowBtns } from '../sort/navigation';
import { updateGoodsInCart } from '../cart/cart';
//import { addGoodsToCart } from '../cart/cart';

export function renderGoodPage(el: types.IGoodsItem) {
  const mainSection: HTMLElement | null = document.querySelector('.main-section');
  const goodCardContainer: HTMLElement | null = document.querySelector('.good-card-wr');
  mainSection?.classList.add('display-none');
  goodCardContainer?.classList.remove('display-none');
  console.log('renderGoodPage:::');
  if (goodCardContainer) {
    goodCardContainer.innerHTML = '';
    const goodCard = createElements('good-card', 'div', goodCardContainer, '');
    const goodCardLeftRow = createElements('good-card__left-row', 'div', goodCard, '');
    const goodCardSecondRow = createElements('good-card__second-row', 'div', goodCard, '');
    const goodCardThirdRow = createElements('good-card__third-row', 'div', goodCard, '');
    for (let j = 0; j < 6; j++) {
      const img = new Image();
      img.classList.add('good-card__photo-min');
      const imgPath: string = el.images[j];
      if (imgPath) {
        img.src = imgPath;
        img.alt = `${el.title} Photo`;
        goodCardLeftRow.appendChild(img);
      }
    }
    const bigImg = new Image();
    bigImg.src = `${el.thumbnail}`;
    bigImg.classList.add('good-card__photo-max');
    goodCardSecondRow.appendChild(bigImg);
    createElements('good-card__title', 'h2', goodCardThirdRow, `${el.title[0].toUpperCase()}${el.title.slice(1, el.title.length)}`);
    createElements('good-card__description', 'h3', goodCardThirdRow, `${el.description}`);
    createElements('good-card__discountPercentage', 'p', goodCardThirdRow, `Discount percentage:  ${el.discountPercentage}`);
    createElements('good-card__rating', 'p', goodCardThirdRow, `Rating: ${el.rating}`);
    createElements('good-card__stock', 'p', goodCardThirdRow, `Stock: ${el.stock}`);
    createElements('good-card__brand', 'p', goodCardThirdRow, `Brand: ${el.brand}`);
    createElements('good-card__category', 'p', goodCardThirdRow, `Category: ${el.category}`);
    createElements('good-card__price', 'h2', goodCardThirdRow, `$ ${el.price}`);
    const goodCardBtnContainer = createElements('good-card__btns-container', 'div', goodCardThirdRow, '');
    createElements('good-card__btn buy-now-btn', 'button', goodCardBtnContainer, 'Buy now');
    const addToCartBtn = createElements('good-card__btn add-to-cart-btn', 'button', goodCardBtnContainer, 'Buy');
    addToCartBtn.addEventListener('click', () => { updateGoodsInCart(addToCartBtn, el.id)});
  }
  changePhotosInGoodsCards();
  getBuyNowBtns();
  //addGoodsToCart();
}

function changePhotosInGoodsCards() {
  const goodsPhotoMax: HTMLElement | null = document.querySelector('.good-card__photo-max');
  const goodsPhotosMini: NodeListOf<Element> | null = document.querySelectorAll('.good-card__photo-min');
  goodsPhotosMini!.forEach((el) =>
    el.addEventListener('click', () => {
      const miniPhotoPath = (el as HTMLImageElement).src;
      const maxPhotoPath = (goodsPhotoMax as HTMLImageElement).src;
      (goodsPhotoMax as HTMLImageElement).src = miniPhotoPath;
      (el as HTMLImageElement).src = maxPhotoPath;
    })
  );
}


