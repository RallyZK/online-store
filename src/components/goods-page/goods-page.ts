import './goods-page.scss';
import * as types from '../types';
import { createElements } from '../sort/sort';


export function getGoodsCard(arr: types.IGoodsItem[]): void {
  const logo: HTMLElement | null = document.querySelector('.header__title');
  logo?.addEventListener('click', () => {
    mainSection?.classList.remove('display-none');
    goodCardContainer?.classList.add('display-none');
  })

  const mainSection: HTMLElement | null = document.querySelector('.main-section');
  const goodCardContainer: HTMLElement | null = document.querySelector('.good-card-wr');
  const goods: NodeListOf<Element> | null = document.querySelectorAll('.goods__item');

  goods!.forEach(el => el.addEventListener('click', () => {

    const index: number = Number(el.getAttribute('item-id')) - 1;
    console.log('index:::', index);
    mainSection?.classList.add('display-none');
    goodCardContainer?.classList.remove('display-none');

    if (goodCardContainer) {
      goodCardContainer.innerHTML = '';
      const goodCard = createElements('good-card', 'div', goodCardContainer, '');
      const goodCardLeftRow = createElements('good-card__left-row', 'div', goodCard, '');
      const goodCardSecondRow = createElements('good-card__second-row', 'div', goodCard, '');
      const goodCardThirdRow = createElements('good-card__third-row', 'div', goodCard, '');
      for (let j = 0; j < 6; j++) {
        const img = new Image();
        img.classList.add('good-card__photo-min');
        const imgPath: string = arr[index].images[j];
        if (imgPath) {
          img.src = imgPath;
          goodCardLeftRow.appendChild(img);
        }
      }
      const bigImg = new Image();
      bigImg.src = `${arr[index].thumbnail}`;
      bigImg.classList.add('good-card__photo-max');
      goodCardSecondRow.appendChild(bigImg);
      createElements('good-card__title', 'h2', goodCardThirdRow, `${arr[index].title[0].toUpperCase()}${arr[index].title.slice(1, arr[index].title.length)}`);
      createElements('good-card__description', 'h3', goodCardThirdRow, `${arr[index].description}`);
      createElements('good-card__discountPercentage', 'p', goodCardThirdRow, `Discount percentage:  ${arr[index].discountPercentage}`);
      createElements('good-card__rating', 'p', goodCardThirdRow, `Rating: ${arr[index].rating}`);
      createElements('good-card__stock', 'p', goodCardThirdRow, `Stock: ${arr[index].stock}`);
      createElements('good-card__brand', 'p', goodCardThirdRow, `Brand: ${arr[index].brand}`);
      createElements('good-card__category', 'p', goodCardThirdRow, `Category: ${arr[index].category}`);
      createElements('good-card__price', 'h2', goodCardThirdRow, `$ ${arr[index].price}`);
      const goodCardBtnContainer = createElements('good-card__btns-container', 'div', goodCardThirdRow, '');
      createElements('good-card__btn buy-now-btn', 'button', goodCardBtnContainer, 'Buy now');
      createElements('good-card__btn add-to-cart-btn', 'button', goodCardBtnContainer, 'Add to cart');
    }
    changePhotosInGoodsCards();
  }))
}

function changePhotosInGoodsCards() {
  const goodsPhotoMax: HTMLElement | null = document.querySelector('.good-card__photo-max');
  const goodsPhotosMini: NodeListOf<Element> | null = document.querySelectorAll('.good-card__photo-min');
  goodsPhotosMini!.forEach(el => el.addEventListener('click', () => {
    const miniPhotoPath = (el as HTMLImageElement).src;
    const maxPhotoPath = (goodsPhotoMax as HTMLImageElement).src;
    (goodsPhotoMax as HTMLImageElement).src = miniPhotoPath;
    (el as HTMLImageElement).src = maxPhotoPath;
  })
  )
}
