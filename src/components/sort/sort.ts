import './sort.scss';
import '../../assets/styles/media.scss';
import catalog from '../../assets/catalog';
import { slideOne, slideTwo, slideThree, slideFour, updateSliderOneMaxValue, sliderTwo, sliderThree, sliderFour, sliderOne } from '../filters/filters';
import { categories } from '../variables';

interface IFilters {
  category: string[];
  brand: string[];
  minPrice: number | boolean;
  maxPrice: number | boolean;
  minRating: number | boolean;
  maxRating: number | boolean;
  sortBy: string | boolean;
  contains: string | boolean;
}

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

export const filters: IFilters = {
  category: [],
  brand: [],
  minPrice: Number(slideOne()),
  maxPrice: Number(updateSliderOneMaxValue()),
  minRating: Number(slideThree()),
  maxRating: Number(slideFour()),
  sortBy: false,
  contains: false,
};

// рендер всех товаров

type viewType = 'cube' | 'list';
let view: viewType = 'cube';

let catalogArr: IGoodsItem[] = catalog.products;

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
renderCatalog(catalogArr);

if (sliderOne)
  sliderOne!.onchange = () => {
    slideOne();
    filters.minPrice = Number(sliderOne!.value);
    //updateAllFilters();
    console.log('filers:::', filters);
  };

if (sliderTwo)
  sliderTwo.onchange = () => {
    slideTwo();
    filters.maxPrice = Number(sliderTwo!.value);
    console.log('filers:::', filters);
  };
if (sliderThree)
  sliderThree.onchange = () => {
    slideThree();
    filters.minRating = Number(sliderThree!.value);
    console.log('filers:::', filters);
  };
if (sliderFour)
  sliderFour.onchange = () => {
    slideFour();
    filters.maxRating = Number(sliderFour!.value);
    console.log('filers:::', filters);
  };

let currentGoodsArray: IGoodsItem[] = catalogArr;

export function updateAllFilters() {
  const arr = sortGoodsArray(catalogArr, n);
  const arr2 = searchGoods(arr, searchFrase);
  const arr3 = getGoodsBySelectedCategories(arr2, filters.category);
  currentGoodsArray = getGoodsBySelectedFilters(arr3, filters.brand);
  renderCatalog(currentGoodsArray);
}

// варианты отображения товаров

const setListBtn: HTMLButtonElement | null = document.querySelector('.list-view');
const setCubeBtn: HTMLButtonElement | null = document.querySelector('.grid-view');

setListBtn!.addEventListener('click', () => {
  view = 'list';
  renderCatalog(currentGoodsArray);
  goodsContainer!.classList.remove('cube-cont');
  goodsContainer!.classList.add('list-cont');
});

setCubeBtn!.addEventListener('click', () => {
  view = 'cube';
  renderCatalog(currentGoodsArray);
  goodsContainer!.classList.add('cube-cont');
  goodsContainer!.classList.remove('list-cont');
});

// фильтр по вариантам сортировки

const goodsSortSelect: HTMLInputElement | null = document.querySelector('.goods__sort-wr__select');
let n: string;
goodsSortSelect!.addEventListener('change', () => {
  n = goodsSortSelect!.value;
  filters.sortBy = n;
  updateAllFilters();
});

// фильтр по поиску введенного слова

const searchInput: HTMLInputElement | null = document.querySelector('.goods__sort-wr__search-wr__input');
const searchBtn: HTMLElement | null = document.querySelector('.goods__sort-wr__search-wr__btn');
let searchFrase: string = '';

searchInput!.addEventListener('keypress', () => getGoodsBySearchFrase());
searchBtn!.addEventListener('click', () => getGoodsBySearchFrase());

function getGoodsBySearchFrase() {
  searchFrase = searchInput!.value;
  filters.contains = searchFrase;
  updateAllFilters();
}

// фильтр по категориям товаров

const categoriesUl: HTMLElement | null = document.querySelector('.categories');
let categoriesLiArr: NodeListOf<Element> | null;
if (categoriesUl) {
  categoriesLiArr = categoriesUl.querySelectorAll('.filters__item__li');
}

categoriesLiArr!.forEach((el: Element, key: number, parent: NodeListOf<Element>): void => {
  el.addEventListener('click', () => {
    const selectedCategory = el.getAttribute('item-category') as string;
    if (!filters.category.includes(selectedCategory)) filters.category.push(selectedCategory);
    updateAllFilters();
    console.log(filters);
    //getGoodsBySelectedCategories(catalogArr, filters.category);
  });
});

function getGoodsBySelectedCategories(arr: IGoodsItem[], selectedCategories: string[]) {
  if (selectedCategories.length === 0) return arr;
  const sortArr = arr.filter((el: IGoodsItem) => selectedCategories.includes(el.category));
  return sortArr;
}

// фильтр по брендам товаров

const brandsUl: HTMLElement | null = document.querySelector('.brands');
let brandsLiArr: NodeListOf<Element> | null;
if (brandsUl) {
  brandsLiArr = brandsUl.querySelectorAll('.filters__item__li');
}

brandsLiArr!.forEach((el: Element, key: number, parent: NodeListOf<Element>): void => {
  el.addEventListener('click', () => {
    const selectedBrand = el.getAttribute('item-brand') as string;
    if (!filters.brand.includes(selectedBrand)) filters.brand.push(selectedBrand);
    updateAllFilters();
    console.log(filters);
    //getGoodsBySelectedFilters(catalogArr, filters.brand);
  });
});

function getGoodsBySelectedFilters(arr: IGoodsItem[], selectedBrands: string[]) {
  if (selectedBrands.length === 0) return arr;
  const sortArr = arr.filter((el: IGoodsItem) => selectedBrands.includes(el.brand));
  return sortArr;
}

// фильтр по выставленным ценам

console.log(filters);

// вспом функции

function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  el.className = className;
  el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}

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
  return arr;
}

function searchGoods(arr: IGoodsItem[], searchFrase: string) {
  if (searchFrase === '') return arr;
  searchFrase = searchFrase.toLowerCase();
  const searchArr = arr.filter((el) => {
    if (
      el.title.toLowerCase().includes(searchFrase) ||
      el.description.toLowerCase().includes(searchFrase) ||
      el.price.toString().includes(searchFrase) ||
      el.rating.toString().includes(searchFrase) ||
      el.stock.toString().includes(searchFrase) ||
      el.brand.toLowerCase().includes(searchFrase) ||
      el.category.toLowerCase().includes(searchFrase)
    )
      return el;
  });
  itemsCount!.innerHTML = `${searchArr.length}`;
  return searchArr;
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  console.log('hashchange', hash);
});
