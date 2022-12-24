import * as types from '../types';
import { renderGoodPage } from '../goods-page/goods-page';
import { catalogArr } from '../sort/sort';

const logo: HTMLElement | null = document.querySelector('.header__title');
const mainSection: HTMLElement | null = document.querySelector('.main-section');
const goodCardContainer: HTMLElement | null = document.querySelector('.good-card-wr');
const cartWrapper: HTMLElement | null = document.querySelector('.cart');
const cartBtn: HTMLElement | null = document.querySelector('.header__cart-wrapper__cart-btn');
const errorPage: HTMLElement | null = document.querySelector('.error-page');
const btnToMainPage: HTMLElement | null = document.querySelector('.error-page__btn');

logo?.addEventListener('click', getMainPage);
cartBtn?.addEventListener('click', getCartPage);
btnToMainPage?.addEventListener('click', getMainPage);

export function getMainPage() {
  mainSection!.classList.remove('display-none');
  goodCardContainer!.classList.add('display-none');
  cartWrapper!.classList.add('display-none');
  errorPage!.classList.add('display-none');
  goodCardContainer!.innerHTML = '';
  window.location.hash = '';
}

export function getCartPage() {
  cartWrapper!.classList.remove('display-none');
  mainSection!.classList.add('display-none');
  goodCardContainer!.classList.add('display-none');
  errorPage!.classList.add('display-none');
  goodCardContainer!.innerHTML = '';
  window.location.hash = 'cart';
}

export function getErrorPage() {
  errorPage!.classList.remove('display-none');
  mainSection!.classList.add('display-none');
  goodCardContainer!.classList.add('display-none');
  cartWrapper!.classList.add('display-none');
  goodCardContainer!.innerHTML = '';  
}

export function getGoodCardFromUrl(hash: string) {
  const id: number = Number(hash.slice(3, 6));  
  const goodItem: types.IGoodsItem = catalogArr.reduce((acc: types.IGoodsItem, el: types.IGoodsItem) => {
    if (el.id === id) {
      acc = el;
      return acc;
    }
    return acc
  });
  if (goodItem) {
    renderGoodPage(goodItem);    
  }
}

