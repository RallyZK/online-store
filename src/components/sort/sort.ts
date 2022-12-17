import './sort.scss';
import '../../assets/styles/media.scss'
import catalog from '../../assets/catalog';

interface IGoodsItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

type viewType = 'cube' | 'list';
let view: viewType = 'cube';

function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  el.className = className;
  el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}

function shuffle(array: IGoodsItem[]) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const catalogArr: IGoodsItem[] = catalog.products;
const goodsContainer: HTMLElement | null = document.querySelector('.goods__goods-container');
let goodsItem: HTMLElement | null;
let goodsItemImg: HTMLElement | null;
let goodsItemDescription: HTMLElement | null;
let goodsItemTitle: HTMLElement | null;
let goodsItemSubtitle: HTMLElement | null;
let goodsItemWrapper: HTMLElement | null;
let goodsItemRating: HTMLElement | null;
let goodsItemPriceWrapper: HTMLElement | null;
let goodsItemPrice: HTMLElement | null;
let goodsItemAddToCartBtn: HTMLElement | null;

function renderCatalog(): void {
  if (goodsContainer) {
    goodsContainer.innerHTML = '';
    const img = new Image();
    for (let i = 0; i < catalogArr.length; i++) {
      goodsItem = createElements(`goods__item ${view}-item`, 'div', goodsContainer, '');
      goodsItemImg = createElements('goods__item__img', 'div', goodsItem, '');
      goodsItemImg.style.backgroundImage = `url(${catalogArr[i].thumbnail})`;
      goodsItemDescription = createElements(`goods__item__description ${view}-desc`, 'div', goodsItem, '');
      goodsItemTitle = createElements('goods__item__title', 'h4', goodsItemDescription, `${catalogArr[i].title}`);
      goodsItemSubtitle = createElements(`goods__item__subtitle ${view}-subtit`, 'h6', goodsItemDescription, `${catalogArr[i].description}`);
      goodsItemWrapper = createElements('goods__item__wrapper', 'div', goodsItemDescription, '');
      goodsItemRating = createElements('goods__item__rating', 'span', goodsItemWrapper, `${catalogArr[i].rating}`);
      goodsItemPriceWrapper = createElements('goods__item__price-wrapper', 'div', goodsItemWrapper, '');
      goodsItemPrice = createElements('goods__item__price', 'span', goodsItemPriceWrapper, `$ ${catalogArr[i].price}`);
      goodsItemAddToCartBtn = createElements(`goods__item__add-to-cart-btn ${view}-btn`, 'button', goodsItemPriceWrapper, 'buy');
      
    }     
  }  
}
renderCatalog()

const setListBtn: HTMLButtonElement | null = document.querySelector('.list-view');
const setCubeBtn: HTMLButtonElement | null = document.querySelector('.grid-view');

setListBtn!.addEventListener('click', () => {
  view = 'list';
  renderCatalog();
  goodsContainer!.classList.remove('cube-cont');
  goodsContainer!.classList.add('list-cont');
  //goodsItemDescription!.classList.add('list-desc');
})

setCubeBtn!.addEventListener('click', () => {
  view = 'cube';
  renderCatalog();
  goodsContainer!.classList.add('cube-cont');
  goodsContainer!.classList.remove('list-cont');  
  //goodsItemDescription!.classList.remove('list-desc');
})


// <div class="goods__goods-container cube-cont">

// <div class="goods__item cube-item"> +
//   <div class="goods__item__img"></div> +
//   <div class="goods__item__description"> +
//     <h4 class="goods__item__title">Phone One X 10 Red 256Gb</h4> +
//     <h6 class="goods__item__subtitle">SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED
//       technology A12 Bionic chip with ...</h6>+
//     <div class="goods__item__wrapper">+
//       <span class="goods__item__rating">4.5</span>+
//       <div class="goods__item__price-wrapper">+
//         <span class="goods__item__price">$ 750</span>+
//         <button class="goods__item__add-to-cart-btn cube-btn">Buy</button>
//       </div>
//     </div>
//   </div>
// </div>