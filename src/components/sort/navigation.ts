import * as types from '../types';
import { renderGoodPage } from '../goods-page/goods-page';
import { catalogArr, rawCatalog } from '../sort/sort';
import { displayPaymentPage } from '../payment/payment';
import { renderCartList } from '../cart/render-cart';

const logo: HTMLElement | null = document.querySelector('.header__title');
const mainSection: HTMLElement | null = document.querySelector('.main-section');
const goodCardContainer: HTMLElement | null = document.querySelector('.good-card-wr');
const cartWrapper: HTMLElement | null = document.querySelector('.cart');
const cartBtn: HTMLElement | null = document.querySelector('.header__cart-wrapper__cart-btn');
const errorPage: HTMLElement | null = document.querySelector('.error-page');
const btnToMainPage: HTMLElement | null = document.querySelector('.error-page__btn');
const paymentPage: HTMLElement | null = document.querySelector('.payment-page-section');

logo?.addEventListener('click', getMainPage);
cartBtn?.addEventListener('click', getCartPage);
btnToMainPage?.addEventListener('click', getMainPage);

export function getMainPage(): void {
  if (mainSection) {
    mainSection.classList.remove('display-none');
  }
  if (cartWrapper) {
    cartWrapper.classList.add('display-none');
  }
  if (errorPage) {
    errorPage.classList.add('display-none');
  }
  if (goodCardContainer) {
    goodCardContainer.innerHTML = '';
    goodCardContainer.classList.add('display-none');
  }
  if (paymentPage) {
    paymentPage.classList.add('display-none');
  }
  window.location.hash = '';
  document.querySelector('.paid-page__wrapper')?.classList.add('display-none');
}

export function getCartPage(): void {
  if (goodCardContainer) {
    goodCardContainer.innerHTML = '';
    goodCardContainer.classList.add('display-none');
  }
  if (cartWrapper) {
    cartWrapper.classList.remove('display-none');
  }
  if (mainSection) {
    mainSection.classList.add('display-none');
  }
  if (errorPage) {
    errorPage.classList.add('display-none');
  } 
  if (paymentPage) {
    paymentPage.classList.add('display-none');
  }
  window.location.hash = 'cart';
  renderCartList(rawCatalog);
}

export function getErrorPage(): void {
  if (errorPage) {
    errorPage.classList.remove('display-none');
  }
  if (mainSection) {
    mainSection.classList.add('display-none');
  }
  if (cartWrapper) {
    cartWrapper.classList.add('display-none');
  }
  if (goodCardContainer) {
    goodCardContainer.innerHTML = '';
    goodCardContainer.classList.add('display-none');
  }
  if (paymentPage) {
    paymentPage.classList.add('display-none');
  }
}

export function getGoodCardFromUrl(hash: string): void {
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
  }
  if (cartWrapper) {
    cartWrapper.classList.add('display-none');
  }
  if (paymentPage) {
    paymentPage.classList.add('display-none');
  }
}

export function getBuyNowBtns(): void {
  const buyNowBtns: NodeListOf<Element> | null = document.querySelectorAll('.buy-now-btn');
  if (buyNowBtns) {
    buyNowBtns.forEach((el) =>
      el.addEventListener('click', () => {
        displayPaymentPage();
      })
    );
  }
}
