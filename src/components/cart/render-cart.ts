import { IGoodsItem } from '../types';
import { createElements, rawCatalog } from '../sort/sort';
import { displayItemsCountInCart, getItemsCountInCart, displayTotalCartSum, getTotalCartSum, goodsInCart, updateGoodsInCart } from '../cart/cart';
import { updateBuyButtonState } from '../payment/payment';

export function renderCartList(arr: IGoodsItem[]): void {
  const cartList: HTMLElement | null = document.querySelector('.cart-list__good-card');
  const cartListCont = document.querySelector('.cart-list__first-row p');
  const productsCount: HTMLElement | null = document.querySelector('.cart-summary__prod-count');

  if (cartListCont) {
    cartListCont.innerHTML = `Items: ${getItemsCountInCart()}`;
  }
  if (productsCount) {
    productsCount.innerHTML = `Products: ${getItemsCountInCart()}`;
  }

  if (cartList) {
    cartList.innerHTML = '';
    if (getItemsCountInCart() === 0) {
      createElements('cart-list__empty', 'p', cartList, 'Cart is empty');
    } else {
      arr.forEach((el) => {
        if (el.isInCart && el.countInCart) {          
          const cartListLi = createElements('cart-list__good-card__li', 'li', cartList, '');
          const img = new Image();
          (img as HTMLImageElement).src = el.thumbnail;
          img.classList.add('cart-list__good-card__img');
          img.alt = `${el.title} Photo`;
          cartListLi.append(img);
          const cartListGoodCardItem = createElements('cart-list__good-card__item', 'div', cartListLi, '');
          createElements('cart-list__good-card__item__title', 'h2', cartListGoodCardItem, el.title);
          createElements('cart-list__good-card__item__description', 'h3', cartListGoodCardItem, el.description);
          createElements('cart-list__good-card__item__rating', 'p', cartListGoodCardItem, `Rating: ${el.rating}`);
          createElements('cart-list__good-card__item__discountPercentage', 'p', cartListGoodCardItem, `Discount: ${el.discountPercentage}%`);

          const cartListCont = createElements('cart-list__counts-cont', 'div', cartListLi, '');
          const countInStock = createElements('cart-list__counts-cont__stock', 'p', cartListCont, `Stock: ${el.stock}`);
          const cartListItemCont = createElements('cart-list__counts-cont__items-cont', 'div', cartListCont, '');
          const decreaseBtn = createElements('cart-list__counts-cont__btn add-items', 'button', cartListItemCont, '-');
          decreaseBtn.setAttribute('index-id', `${el.id}`);
          decreaseBtn.addEventListener('click', () => {
            decreaseItems(arr, el, countItemInCart, countInStock);
            //updateGoodsInCart(decreaseBtn, el.id);
          });
          const countItemInCart = createElements('cart-list__counts-cont__items-count', 'p', cartListItemCont, `${el.countInCart}`);
          const increaseBtn = createElements('cart-list__counts-cont__btn del-items', 'button', cartListItemCont, '+');
          increaseBtn.setAttribute('index-id', `${el.id}`);
          increaseBtn.addEventListener('click', () => {
            increaseItems(arr, el, countItemInCart, countInStock);
            //updateGoodsInCart(increaseBtn, el.id);
          });
          createElements('cart-list__counts-cont__total-item-count', 'p', cartListCont, `$ ${el.price * el.countInCart}`);
        }
      });
    }
  }
  updateCartSummary(arr);
  updateBuyButtonState();
}

function increaseItems(arr: IGoodsItem[], el: IGoodsItem, countItemInCart: HTMLElement, countInStock: HTMLElement) {
  if (el.countInCart && el.stock >= 1) {
    el.countInCart += 1;
    el.stock -= 1;
    countItemInCart.innerHTML = (el.countInCart).toString();
    countInStock.innerHTML = `Stock: ${el.stock}`;
    renderCartList(arr);
    updateCartSummary(arr);
    updateBuyButtonState();
  }
}

function decreaseItems(arr: IGoodsItem[], el: IGoodsItem, countItemInCart: HTMLElement, countInStock: HTMLElement) {
  console.log('decr el.countInCart:::', el.countInCart);
  if (el.countInCart && el.countInCart > 1) {
    console.log('decr el.countInCart:::', el.countInCart);
    el.countInCart = el.countInCart - 1;
    el.stock += 1;
    countItemInCart.innerHTML = (el.countInCart).toString();
    countInStock.innerHTML = `Stock: ${el.stock}`;
  } else if (el.countInCart && el.countInCart === 1) {
    console.log('decr el.countInCart:::', el.countInCart);
    el.countInCart = el.countInCart - 1;
    el.stock += 1;
    el.isInCart = false;
  }
  renderCartList(arr);
  updateCartSummary(arr);
  updateBuyButtonState();
  console.log("goodsInCart", goodsInCart)
}

let totalSum = 0;
enum Promocodes {
  black = 10,
  pink = 5,
}

function updateCartSummary(arr: IGoodsItem[]): void {
  const totalCount: HTMLElement | null = document.querySelector('.cart-summary__total-count');
  const totalCountDisc: HTMLElement | null = document.querySelector('.cart-summary__total-count-disc');

  if (totalCount) totalCount.innerHTML = `&nbsp;&nbsp;Total: $${getTotalCartSums(arr, false)}&nbsp;&nbsp;`;
  totalSum = getTotalCartSums(arr, true);
  totalSum = updateTotalSumByPromocodes(totalSum);
  if (totalCountDisc) totalCountDisc.innerHTML = `Total: $${totalSum}`;
  displayItemsCountInCart(getItemsCountInCart());
  displayTotalCartSum(getTotalCartSum());
}

function getTotalCartSums(arr: IGoodsItem[], isDiscount: boolean): number {
  let sum = arr.reduce((acc: number, el: IGoodsItem) => {
    if (el.isInCart && el.countInCart) {
      if (isDiscount) acc = acc + el.countInCart * el.price * ((100 - el.discountPercentage) / 100);
      else acc = acc + el.countInCart * el.price;
      return Math.floor(acc);
    }
    return Math.floor(acc);
  }, 0);
  return sum;
}

const appliedCodesErrorCont: HTMLElement | null = document.querySelector('.cart-summary__applied-codes__error-cont');
const appliedCodesList: HTMLElement | null = document.querySelector('.cart-summary__applied-codes__list');
const codeInput: HTMLInputElement | null = document.querySelector('.cart-summary__code-input');
let appliedPromocodes: string[] = [];

if (codeInput)
  codeInput.addEventListener('keydown', () => {
    updatePromocodesList();
    updateCartSummary(rawCatalog);
  });

function updatePromocodesList(): void {
  if (codeInput) {
    if (codeInput.value.toLowerCase() === 'black' || codeInput.value.toLowerCase() === 'pink') {
      if (!appliedPromocodes.includes(codeInput.value)) {
        appliedPromocodes.push(codeInput.value);
        setTimeout(() => (codeInput.value = ''), 300);

        if (appliedCodesErrorCont) {
          appliedCodesErrorCont.innerHTML = '';
        }

        if (appliedCodesList) {
          const appliedCodesCont = createElements('cart-summary__applied-codes__cont', 'div', appliedCodesList, '');
          createElements('cart-summary__applied-codes__code-name', 'p', appliedCodesCont, `${codeInput.value.toUpperCase()}`);
          const addPromoBtn = createElements('cart-summary__applied-codes__btn', 'button', appliedCodesCont, 'Drop');
          addPromoBtn.setAttribute('promo', codeInput.value);
        }
      }
    }
  }
  removePromocodes();
}

function updateTotalSumByPromocodes(totalSum: number): number {
  if (appliedPromocodes.includes('black') && appliedPromocodes.includes('pink')) {
    totalSum = (totalSum * (100 - Promocodes.black - Promocodes.pink)) / 100;
  }
  if (appliedPromocodes.includes('black') && !appliedPromocodes.includes('pink')) {
    totalSum = (totalSum * (100 - Promocodes.black)) / 100;
  }
  if (appliedPromocodes.includes('pink') && !appliedPromocodes.includes('black')) {
    totalSum = (totalSum * (100 - Promocodes.pink)) / 100;
  }
  if (appliedPromocodes.length === 0) {
    totalSum = totalSum;
  }
  return Number(totalSum.toFixed(2));
}

function removePromocodes(): void {
  const addPromoBtns: NodeListOf<Element> | null = document.querySelectorAll('.cart-summary__applied-codes__btn');
  if (addPromoBtns) {
    addPromoBtns.forEach((el) =>
      el.addEventListener('click', () => {
        console.log('el.getAttribute(promo)', el.getAttribute('promo'));
        if (el.getAttribute('promo') === 'black') {
          appliedPromocodes = appliedPromocodes.filter((el) => el !== 'black');
          if (appliedCodesList) {
            appliedCodesList.removeChild(el.parentElement as Node);
          }
        }
        if (el.getAttribute('promo') === 'pink') {
          appliedPromocodes = appliedPromocodes.filter((el) => el !== 'pink');
          if (appliedCodesList) {
            appliedCodesList.removeChild(el.parentElement as Node);
          }
        }
        console.log('appliedPromocodes', appliedPromocodes);
        updateCartSummary(rawCatalog);
      })
    );
  }
}
