import './cart.scss';
import * as types from '../types';
import { catalogArr } from '../sort/sort';
import { renderCartList } from '../cart/render-cart';

export let goodsInCart: types.IGoodInCart[] = [];
const countItemsInCart: HTMLElement | null = document.querySelector('.header__cart-wrapper__items-count');
const totalCartCount: HTMLElement | null = document.querySelector('.header__cart-wrapper__sum');


export function addGoodsToCart(): void {
  const addToCartButtons: NodeListOf<Element> | null = document.querySelectorAll('.goods__item__add-to-cart-btn');
  const addToCartBtn: HTMLElement | null = document.querySelector('.add-to-cart-btn');

  if (addToCartButtons) {
    addToCartButtons.forEach(el => el.addEventListener('click', () => addItemToCart(el)))
  }
  if (addToCartBtn) addToCartBtn.addEventListener('click', () => addItemToCart(addToCartBtn));
}
addGoodsToCart()

function addItemToCart(el: Element): void {
  el.classList.toggle('goods-in-cart');
  
  if (el.innerHTML === 'Add to cart') {    
    el.innerHTML = ' Remove ';
  } else if (el.innerHTML === 'Buy') {    
    el.innerHTML = 'Remove';
  } else if (el.innerHTML === ' Remove ') {
    el.innerHTML = 'Add to cart';
  } else if (el.innerHTML === 'Remove') {
    el.innerHTML = 'Buy';
  }   

  const id = Number(el.getAttribute('item-id'));
  updateGoodsItemToCart(id);
}

function updateGoodsItemToCart(id: number): void {

  const goodItem: types.IGoodsItem = catalogArr.reduce((acc: types.IGoodsItem, el: types.IGoodsItem) => {
    if (el.id === id) {
      acc = el;
      return acc;
    }
    return acc;
  });
  if (goodItem) {
    if (checkIsGoodInCart(id) === true) {
      goodsInCart = goodsInCart.filter(el => {
        if (el.item) {
          if (el.item.id !== id) return el;
        }
      })
    } else {
      goodsInCart.push({
        count: 1,
        item: goodItem,
      });
    }
    renderCartList(goodsInCart);
    updateItemsCount();
    updateTotalCartCount();
    console.log('goodsInCart:::', goodsInCart);
  }
}

function checkIsGoodInCart(id: number): Boolean {
  for (let i = 0; i < goodsInCart.length; i++) {
    if (goodsInCart[i].item!.id === id) return true;
  }
  return false;
}

function updateItemsCount(): void {
  if (goodsInCart.length === 0) countItemsInCart?.classList.add('display-none');
  else countItemsInCart?.classList.remove('display-none');
  if (countItemsInCart) countItemsInCart.innerHTML = goodsInCart.length.toString();
}

function updateTotalCartCount(): void {
  const totalSum = goodsInCart.reduce((acc: number, el) => {
    if (el.item) acc = acc + el.item.price;
    return acc;
  }, 0)
  console.log('totalSum:::', totalSum);

  if (totalSum !== 0) {
    if (totalCartCount) {
      totalCartCount.classList.remove('display-none');
      totalCartCount.innerHTML = `$ ${totalSum}`;
    }
  } else {
    totalCartCount?.classList.add('display-none');
  }
}



