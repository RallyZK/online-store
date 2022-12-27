import * as types from '../types';
import { renderGoodPage } from '../goods-page/goods-page';
import { catalogArr, currentGoodsArray, rawCatalog } from '../sort/sort';
import { displayPaymentPage } from '../payment/payment';
import { renderCartList } from '../cart/render-cart';

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
  document.querySelector('.paid-page__wrapper')?.classList.add('display-none');
}

export function getCartPage() {
  cartWrapper!.classList.remove('display-none');
  mainSection!.classList.add('display-none');
  goodCardContainer!.classList.add('display-none');
  errorPage!.classList.add('display-none');
  goodCardContainer!.innerHTML = '';
  window.location.hash = 'cart';
  renderCartList(rawCatalog);
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
    return acc;
  });
  if (goodItem) {
    renderGoodPage(goodItem);
    console.log('goodItem:::', goodItem);
  }
}

export function getBuyNowBtns() {
  const buyNowBtns: NodeListOf<Element> | null = document.querySelectorAll('.buy-now-btn');
  if (buyNowBtns) {
    buyNowBtns.forEach((el) =>
      el.addEventListener('click', () => {
        displayPaymentPage();
      })
    );
  }
}
