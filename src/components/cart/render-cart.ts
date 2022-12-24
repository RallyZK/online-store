import { createElements } from '../sort/sort';
import { IGoodInCart } from '../types';
import { goodsInCart } from '../cart/cart';
import { catalogArr } from '../sort/sort';

const cartList: HTMLElement | null = document.querySelector('.cart-list__good-card');
const cartListCont = document.querySelector('.cart-list__first-row p');

export function renderCartList(arr: IGoodInCart[]) {
  console.log(arr);
  if (cartList) {
    cartList.innerHTML = '';
    if (cartListCont) cartListCont.innerHTML = `Items: ${arr.length}`;
    arr.forEach(el => {
      if (el.item) {
        const cartListLi = createElements('cart-list__good-card__li', 'li', cartList, '');
        const img = new Image();
        (img as HTMLImageElement).src = el.item.thumbnail;
        img.classList.add('cart-list__good-card__img');
        img.alt = `${el.item.title} Photo`;
        cartListLi.append(img);
        const cartListGoodCardItem = createElements('cart-list__good-card__item', 'div', cartListLi, '');
        createElements('cart-list__good-card__item__title', 'h2', cartListGoodCardItem, el.item.title);
        createElements('cart-list__good-card__item__description', 'h3', cartListGoodCardItem, el.item.description);
        createElements('cart-list__good-card__item__rating', 'p', cartListGoodCardItem, `Rating: ${el.item.rating}`);
        createElements('cart-list__good-card__item__discountPercentage', 'p', cartListGoodCardItem, `Discount percentage: ${el.item.discountPercentage}`);

        const cartListCont = createElements('cart-list__counts-cont', 'div', cartListLi, '');
        createElements('cart-list__counts-cont__stock', 'p', cartListCont, `Stock: ${el.item.stock}`);
        const cartListItemCont = createElements('cart-list__counts-cont__items-cont', 'div', cartListCont, '');
        createElements('cart-list__counts-cont__btn add-items', 'button', cartListItemCont, '-');
        createElements('cart-list__counts-cont__items-count', 'p', cartListItemCont, `${el.count}`);
        createElements('cart-list__counts-cont__btn del-items', 'button', cartListItemCont, '+');
        createElements('cart-list__counts-cont__total-item-count', 'p', cartListCont, `$ ${el.item.price}`);
      }
    })
  }
}




// <li class="cart-list__good-card__li">
// <img class="cart-list__good-card__img" src="./assets/icons/shopify.png" alt="good-photo">
// <div class="cart-list__good-card__item">
//   <h2 class="cart-list__good-card__item__title">Apple 14 Pro</h2>
//   <h3 class="cart-list__good-card__item__description">An apple mobile which is nothing like apple</h3>
//   <p class="cart-list__good-card__item__rating">Rating: 4.5</p>
//   <p class="cart-list__good-card__item__discountPercentage">Discount percentage: 12</p>
// </div>
// <div class="cart-list__counts-cont">
//   <p class="cart-list__counts-cont__stock">Stock: 96</p>
//   <div class="cart-list__counts-cont__items-cont">
//     <button class="cart-list__counts-cont__btn add-items">-</button>
//     <p class="cart-list__counts-cont__items-count">3</p>
//     <button class="cart-list__counts-cont__btn del-items">+</button>
//   </div>
//   <p class="cart-list__counts-cont__total-item-count">$ 1500</p>
// </div>
// </li>