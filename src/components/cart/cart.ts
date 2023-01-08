import './cart.scss';
import * as types from '../types';
import { rawCatalog, updateAllFilters } from '../sort/sort';

export let goodsInCart: types.Itest[] = [];

export function updateGoodsInCart(el: HTMLElement, id: number): void {
  let index: number = id - 1;
  if (!rawCatalog[index].isInCart) {
    rawCatalog[index].countInCart = 1;
    rawCatalog[index].isInCart = true;
    rawCatalog[index].stock -= 1;
  } else {
    rawCatalog[index].countInCart = 0;
    rawCatalog[index].isInCart = false;
    rawCatalog[index].stock += 1;
  }
  displayItemsCountInCart(getItemsCountInCart());
  displayTotalCartSum(getTotalCartSum());
  colorAddToCartButtons(el, id);
  updateAllFilters();
}

export function getItemsCountInCart(): number {
  return rawCatalog.reduce((acc: number, el: types.IGoodsItem) => {
    if (el.isInCart && el.countInCart) acc += el.countInCart;
    return acc;
  }, 0);
}

export function displayItemsCountInCart(count: number): void {
  const countItemsInCart: HTMLElement | null = document.querySelector('.header__cart-wrapper__items-count');
  if (countItemsInCart) {
    if (count === 0) {
      countItemsInCart.classList.add('display-none');
    } else {
      countItemsInCart.classList.remove('display-none');
      countItemsInCart.innerHTML = count.toString();
    }
  }
}

export function getTotalCartSum(): number {
  return rawCatalog.reduce((acc: number, el: types.IGoodsItem) => {
    if (el.isInCart && el.countInCart) {
      acc = acc + el.price * el.countInCart;
    }
    return acc;
  }, 0);
}

export function displayTotalCartSum(sum: number): void {
  const totalCartCount: HTMLElement | null = document.querySelector('.header__cart-wrapper__sum');
  if (totalCartCount) {
    if (sum !== 0) {
      totalCartCount.classList.remove('display-none');
      totalCartCount.innerHTML = `$ ${sum}`;
    } else {
      totalCartCount.classList.add('display-none');
    }
  }
}

export function colorAddToCartButtons(el: HTMLElement, id: number): void {
  if (rawCatalog[id - 1].isInCart) {
    el.classList.add('goods-in-cart');
    el.innerHTML = 'Remove';
  } else {
    el.classList.remove('goods-in-cart');
    el.innerHTML = 'Buy';
  }
}
