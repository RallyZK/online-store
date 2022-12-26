import './cart.scss';
import * as types from '../types';
import { rawCatalog, updateAllFilters } from '../sort/sort';
import { renderCartList } from './render-cart';

export let goodsInCart: types.Itest[] = [];
const countItemsInCart: HTMLElement | null = document.querySelector('.header__cart-wrapper__items-count');

export function updateGoodsInCart(el: HTMLElement, id: number): void {
  let index = id - 1;
  if (!checkIsGoodInCart(id)) {
    goodsInCart.push({
      id: id,
      countInCart: 1,
    });
    rawCatalog[index].countInCart = 1;
    rawCatalog[index].isInCart = true;
  } else {
    goodsInCart = goodsInCart.filter(el => {
      if (el.id !== id) return el;
    })
    rawCatalog[index].countInCart = 0;
    rawCatalog[index].isInCart = false;
  }
  updateItemsCount(); 
  displayTotalCartSum (getTotalCartSum());
  colorAddToCartButtons(el, id);
  updateAllFilters();
  console.log('goodsInCart:::', goodsInCart);  
}

function checkIsGoodInCart(id: number): Boolean {
  for (let i = 0; i < goodsInCart.length; i++) {
    if (goodsInCart[i].id === id) return true;
  }
  return false;
}

function updateItemsCount(): void {
  if (countItemsInCart) {
    if (goodsInCart.length === 0) {
      countItemsInCart.classList.add('display-none');
    } else {
      countItemsInCart.classList.remove('display-none');
      countItemsInCart.innerHTML = goodsInCart.length.toString();
    }
  }
}

export function getTotalCartSum(): number {
  //const idItemsInCart = goodsInCart.map((el) => el.id);
  const sum = rawCatalog.reduce((acc: number, el: types.IGoodsItem) => {
    if (el.isInCart && el.countInCart) {
      acc = acc + el.price * el.countInCart;
    }
    return acc;
  }, 0);
  console.log('Cart sum:::', sum);
  return sum;

  // if (totalCartCount) {
  //   if (sum !== 0) {
  //     totalCartCount.classList.remove('display-none');
  //     totalCartCount.innerHTML = `$ ${sum}`;
  //   } else {
  //     totalCartCount.classList.add('display-none');
  //   }
  // }
  
}

function displayTotalCartSum (sum: number) {
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

