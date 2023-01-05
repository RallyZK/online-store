import * as types from '../types';
import { renderGoodPage } from '../goods-page/goods-page';
import { catalogArr, rawCatalog, renderCatalog, currentGoodsArray } from '../sort/sort';
import { displayPaymentPage } from '../payment/payment';
import { renderCartList } from '../cart/render-cart';
import { burgerMenuBtn } from '../filters/burger';
import { state, getPageByHref, updateState } from '../sort/url';

const logo: HTMLElement | null = document.querySelector('.header__title');
const mainSection: HTMLElement | null = document.querySelector('.main-section');
const goodCardContainer: HTMLElement | null = document.querySelector('.good-card-wr');
const cartWrapper: HTMLElement | null = document.querySelector('.cart');
const cartBtn: HTMLElement | null = document.querySelector('.header__cart-wrapper__cart-btn');
const cartLink: HTMLElement | null= document.querySelector('.header__cart-wrapper__cart-link');
const errorPage: HTMLElement | null = document.querySelector('.error-page');
const btnToMainPage: HTMLElement | null = document.querySelector('.error-page__btn');
const paymentPage: HTMLElement | null = document.querySelector('.payment-page-section');
const paymentPageWrapper: HTMLElement | null = document.querySelector('.paid-page__wrapper');

//logo?.addEventListener('click', getMainPage);
logo?.addEventListener('click', (event) => { getPageByHref(event) });
//cartBtn?.addEventListener('click', getCartPage);
if (cartLink) cartLink.addEventListener('click', (event) => { getPageByHref(event) });
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
  if (paymentPageWrapper) {
    paymentPageWrapper.classList.add('display-none');
  }
  if (burgerMenuBtn) {
    burgerMenuBtn.classList.remove('display-none');
  }  
  renderCatalog(currentGoodsArray);  
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
  if (burgerMenuBtn) {
    burgerMenuBtn.classList.add('display-none');
  }  
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
  if (burgerMenuBtn) {
    burgerMenuBtn.classList.add('display-none');
  }
}

export function getGoodCardFromUrl(hash: string): void {
  //const id: number = Number(hash.slice(3, 6));
  const id: number = Number(hash);
  const goodItem: types.IGoodsItem = catalogArr.reduce((acc: types.IGoodsItem, el: types.IGoodsItem) => {
    if (el.id === id) {
      acc = el;
      return acc;
    }
    return acc;
  });
  if (goodItem) {
    renderGoodPage(goodItem);
  } else {
    getErrorPage();
  }
  if (cartWrapper) {
    cartWrapper.classList.add('display-none');
  }
  if (paymentPage) {
    paymentPage.classList.add('display-none');
  }
  if (burgerMenuBtn) {
    burgerMenuBtn.classList.add('display-none');
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
