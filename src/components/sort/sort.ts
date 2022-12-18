import './sort.scss';
import '../../assets/styles/media.scss'
import catalog from '../../assets/catalog';
import { slideOne, slideTwo, slideThree, slideFour } from '../filters/filters';

interface IFilters {
  category: string | boolean,
  brand: string | boolean,
  price: number | boolean,
  rating: number | boolean,
  sortBy: string | boolean,
  contains: string | boolean,
}

const filters: IFilters = {
  category: false,
  brand: false,
  price: false,
  rating: false,
  sortBy: false,
  contains: false,  
}

type viewType = 'cube' | 'list';
let view: viewType = 'cube';

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

const catalogArr: IGoodsItem[] = catalog.products;

const goodsContainer: HTMLElement | null = document.querySelector('.goods__goods-container');
const itemsCount: HTMLElement | null = document.querySelector('.items-count');
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

function renderCatalog(arr: IGoodsItem[]): void {
  if (goodsContainer) {
    goodsContainer.innerHTML = '';
    const img = new Image();
    for (let i = 0; i < arr.length; i++) {
      goodsItem = createElements(`goods__item ${view}-item`, 'div', goodsContainer, '');
      goodsItem.setAttribute('item-id', `${arr[i].id}`);
      goodsItemImg = createElements('goods__item__img', 'div', goodsItem, '');
      goodsItemImg.style.backgroundImage = `url(${arr[i].thumbnail})`;
      goodsItemDescription = createElements(`goods__item__description ${view}-desc`, 'div', goodsItem, '');
      goodsItemTitle = createElements('goods__item__title', 'h4', goodsItemDescription, `${arr[i].title[0].toUpperCase()}${arr[i].title.slice(1, arr[i].title.length)}`);
      goodsItemSubtitle = createElements(`goods__item__subtitle ${view}-subtit`, 'h6', goodsItemDescription, `${arr[i].description}`);
      goodsItemWrapper = createElements('goods__item__wrapper', 'div', goodsItemDescription, '');
      goodsItemRating = createElements('goods__item__rating', 'span', goodsItemWrapper, `${arr[i].rating}`);
      goodsItemPriceWrapper = createElements('goods__item__price-wrapper', 'div', goodsItemWrapper, '');
      goodsItemPrice = createElements('goods__item__price', 'span', goodsItemPriceWrapper, `$ ${arr[i].price}`);
      goodsItemAddToCartBtn = createElements(`goods__item__add-to-cart-btn ${view}-btn`, 'button', goodsItemPriceWrapper, 'buy');

    }
    itemsCount!.innerHTML = `${arr.length}`;
  }
}
renderCatalog(catalogArr)

const setListBtn: HTMLButtonElement | null = document.querySelector('.list-view');
const setCubeBtn: HTMLButtonElement | null = document.querySelector('.grid-view');

setListBtn!.addEventListener('click', () => {
  view = 'list';
  renderCatalog(catalogArr);
  goodsContainer!.classList.remove('cube-cont');
  goodsContainer!.classList.add('list-cont');
})

setCubeBtn!.addEventListener('click', () => {
  view = 'cube';
  renderCatalog(catalogArr);
  goodsContainer!.classList.add('cube-cont');
  goodsContainer!.classList.remove('list-cont');
})

const goodsSortSelect: HTMLInputElement | null = document.querySelector('.goods__sort-wr__select');

goodsSortSelect!.addEventListener('change', () => {
  let n: string = goodsSortSelect!.value;
  filters.sortBy = n;
  sortGoodsArray(catalogArr, n);
})

function sortGoodsArray(arr: IGoodsItem[], n: string) {
  if (n === '0') {
    arr.sort((a, b) => a.price - b.price);
  } else if (n === '1') {
    arr.sort((a, b) => b.price - a.price);
  } else if (n === '2') {
    arr.sort((a, b) => a.rating - b.rating);
  } else if (n === '3') {
    arr.sort((a, b) => b.rating - a.rating);
  } else if (n === '4') {
    arr.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      if (a.title === b.title) {
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
      }
      return 0;
    });
  } else if (n === '5') {
    arr.sort((a, b) => {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      if (a.title === b.title) {
        if (a.description > b.description) return -1;
        if (a.description < b.description) return 1;
      }
      return 0;
    });
  } 
  renderCatalog(arr);
}

const searchInput: HTMLInputElement | null = document.querySelector('.goods__sort-wr__search-wr__input');
const searchBtn: HTMLElement | null = document.querySelector('.goods__sort-wr__search-wr__btn');

searchInput!.addEventListener('keypress', () => {
  let str: string = searchInput!.value;
  filters.contains = str;
  searchGoods(catalogArr, str);
})

searchBtn!.addEventListener('click', () => {
  let str: string = searchInput!.value;
  filters.contains = str;
  searchGoods(catalogArr, str);
})

function searchGoods (arr: IGoodsItem[], searchText: string) {
  searchText = searchText.toLowerCase();
  const searchArr = arr.filter((el) => {
    if (el.title.toLowerCase().includes(searchText)    
    || el.description.toLowerCase().includes(searchText)
    || el.price.toString().includes(searchText)
    || el.rating.toString().includes(searchText)
    || el.stock.toString().includes(searchText)
    || el.brand.toLowerCase().includes(searchText)
    || el.category.toLowerCase().includes(searchText))
    return el
  })
  itemsCount!.innerHTML = `${searchArr.length}`;
  renderCatalog(searchArr);
}

// вспом функции

function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  el.className = className;
  el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}





