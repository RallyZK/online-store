import './sort.scss';
import '../../assets/styles/media.scss';
import * as types from '../types';
import catalog from '../../assets/catalog';
import {
  slideOne,
  slideTwo,
  slideThree,
  slideFour,
  sliderTwo,
  sliderThree,
  sliderFour,
  sliderOne,
  SLIDER_MAX_PRICE,
  SLIDER_MIN_PRICE,
  SLIDER_MAX_RATING,
} from '../filters/filters';
import { updateGoodsInCart, colorAddToCartButtons } from '../cart/cart';

if (sliderOne) {
  sliderOne.value = SLIDER_MIN_PRICE.toString();
  sliderOne.onchange = () => {
    slideOne();
    if (sliderOne) {
      filters.minPrice = Number(sliderOne.value);
    }
    updateAllFilters();
  };
}

if (sliderTwo) {
  sliderTwo.value = SLIDER_MAX_PRICE.toString();
  sliderTwo.onchange = () => {
    slideTwo();
    if (sliderTwo) {
      filters.maxPrice = Number(sliderTwo.value);
    }
    updateAllFilters();
  };
}

if (sliderThree) {
  sliderThree.onchange = () => {
    slideThree();
    if (sliderThree) {
      filters.minRating = Number(sliderThree.value);
    }
    updateAllFilters();
  };
}

if (sliderFour) {
  sliderFour.onchange = () => {
    slideFour();
    if (sliderFour) {
      filters.maxRating = Number(sliderFour.value);
    }
    updateAllFilters();
  };
}

export const filters: types.IFilters = {
  category: [],
  brand: [],
  minPrice: SLIDER_MIN_PRICE,
  maxPrice: SLIDER_MAX_PRICE,
  minRating: 0,
  maxRating: 5,
  sortBy: '0',
  contains: '',
  view: 'cube',
};

// рендер всех товаров

let view: types.viewType = 'cube';

export const rawCatalog: types.IGoodsItem[] = catalog.products.map((el) => el);
export let catalogArr: types.IGoodsItem[] = catalog.products;
export let currentGoodsArray: types.IGoodsItem[] = catalog.products;

const goodsContainer: HTMLElement | null = document.querySelector('.goods__goods-container');
const itemsCount: HTMLElement | null = document.querySelector('.items-count');

export function renderCatalog(arr: types.IGoodsItem[]): void {
  if (goodsContainer) {
    goodsContainer.innerHTML = '';

    if (arr.length === 0) {
      goodsContainer.innerHTML = 'No goods found';
    } else {
      for (let i = 0; i < arr.length; i++) {
        const goodsItem = createElements(`goods__item ${view}-item`, 'div', goodsContainer, '');
        goodsItem.setAttribute('item-id', `${arr[i].id}`);

        const goodsLink = createElements('', 'a', goodsItem, '');
        (goodsLink as HTMLAnchorElement).href = `#id=${arr[i].id.toString().padStart(3, '0')}`;
        const goodsItemImg = createElements('goods__item__img', 'img', goodsLink, '');
        (goodsItemImg as HTMLImageElement).src = `${arr[i].thumbnail}`;
        (goodsItemImg as HTMLImageElement).alt = `${arr[i].title} Photo`;

        const goodsItemDescription = createElements(`goods__item__description ${view}-desc`, 'div', goodsItem, '');
        createElements(
          'goods__item__title',
          'h4',
          goodsItemDescription,
          `${arr[i].title[0].toUpperCase()}${arr[i].title.slice(1, arr[i].title.length)}`
        );
        createElements(`goods__item__subtitle ${view}-subtit`, 'h6', goodsItemDescription, `${arr[i].description}`);
        const goodsItemWrapper = createElements('goods__item__wrapper', 'div', goodsItemDescription, '');
        createElements('goods__item__rating', 'span', goodsItemWrapper, `${arr[i].rating}`);
        const goodsItemPriceWrapper = createElements('goods__item__price-wrapper', 'div', goodsItemWrapper, '');
        createElements('goods__item__price', 'span', goodsItemPriceWrapper, `$ ${arr[i].price}`);

        const addToCartButton = createElements(`goods__item__add-to-cart-btn ${view}-btn`, 'button', goodsItemPriceWrapper, 'Buy');
        addToCartButton.setAttribute('item-id', `${arr[i].id}`);
        colorAddToCartButtons(addToCartButton, Number(arr[i].id));
        addToCartButton.addEventListener('click', () => {
          updateGoodsInCart(addToCartButton, arr[i].id);
        });
      }
    }
    if (itemsCount) {
      itemsCount.innerHTML = `${arr.length}`;
    }
  }
}
renderCatalog(currentGoodsArray);

// варианты отображения товаров

const setListBtn: HTMLButtonElement | null = document.querySelector('.list-view');
const setCubeBtn: HTMLButtonElement | null = document.querySelector('.grid-view');

setListBtn!.addEventListener('click', () => {
  changeView('list', 'cube');
});
setCubeBtn!.addEventListener('click', () => {
  changeView('cube', 'list');
});

function changeView(typeOfView: types.viewType, deleteTypeOfView: types.viewType): void {
  view = typeOfView;
  filters.view = typeOfView;
  renderCatalog(currentGoodsArray);
  if (goodsContainer) {
    goodsContainer.classList.add(`${typeOfView}-cont`);
  }
  if (goodsContainer) {
    goodsContainer.classList.remove(`${deleteTypeOfView}-cont`);
  }
}

// фильтр по вариантам сортировки

const goodsSortSelect: HTMLInputElement | null = document.querySelector('.goods__sort-wr__select');
let sortOption: string = '0';

if (goodsSortSelect) {
  goodsSortSelect.addEventListener('change', sortCatalog);
}

function sortCatalog(): void {
  if (goodsSortSelect) {
    sortOption = goodsSortSelect.value;
    filters.sortBy = sortOption;
    updateAllFilters();
  }
}

// фильтр по поиску введенного слова

const searchInput: HTMLInputElement | null = document.querySelector('.goods__sort-wr__search-wr__input');
const searchBtn: HTMLElement | null = document.querySelector('.goods__sort-wr__search-wr__btn');
let searchFrase: string = filters.contains;

if (searchInput) {
  searchInput.focus();
  //searchInput.addEventListener('keypress', () => getGoodsBySearchFrase());
  searchInput.oninput = () => getGoodsBySearchFrase();
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => getGoodsBySearchFrase());
}

function getGoodsBySearchFrase(): void {
  if (searchInput) {
    searchFrase = searchInput.value;
    filters.contains = searchFrase;
    updateAllFilters();
  }
}

// фильтр по категориям товаров

const categoriesUl: HTMLElement | null = document.querySelector('.categories');
let categoriesLiArr: NodeListOf<Element> | null;
if (categoriesUl) {
  categoriesLiArr = categoriesUl.querySelectorAll('.filters__item__li');

  categoriesLiArr.forEach((el: Element): void => {
    el.addEventListener('click', () => {
      const selectedCategory = el.getAttribute('item-category') as string;
      if (!filters.category.includes(selectedCategory)) {
        filters.category.push(selectedCategory);
      } else {
        filters.category = filters.category.filter((el) => el !== selectedCategory);
      }
      //updateRangeInputs(currentGoodsArray);
      updateAllFilters();
      el.classList.toggle('selected-filter');
    });
  });
}

// фильтр по брендам товаров

const brandsUl: HTMLElement | null = document.querySelector('.brands');
let brandsLiArr: NodeListOf<Element> | null;
if (brandsUl) {
  brandsLiArr = brandsUl.querySelectorAll('.filters__item__li');

  brandsLiArr.forEach((el: Element): void => {
    el.addEventListener('click', () => {
      const selectedBrand = el.getAttribute('item-brand') as string;
      if (filters.brand.includes(selectedBrand)) {
        filters.brand = filters.brand.filter((el) => el !== selectedBrand);
      } else {
        filters.brand.push(selectedBrand);
      }
      updateAllFilters();
      //updateRangeInputs(currentGoodsArray);
      el.classList.toggle('selected-filter');
    });
  });
}

// фильтр по выставленным ценам

function getCatalogByPrice(arr: types.IGoodsItem[], minVal: number, maxVal: number): types.IGoodsItem[] {
  return arr.filter((el) => el.price >= minVal && el.price <= maxVal);
}

function getCatalogByRating(arr: types.IGoodsItem[], minVal: number, maxVal: number): types.IGoodsItem[] {
  return arr.filter((el) => el.rating >= minVal && el.rating <= maxVal);
}

export function updateAllFilters(): void {
  const arr = sortGoodsArray(catalogArr, sortOption);
  const arr2 = searchGoods(arr, searchFrase);
  const arr3 = getGoodsBySelectedCategories(arr2, filters.category);
  const arr4 = getGoodsBySelectedFilters(arr3, filters.brand);
  const arr5 = getCatalogByPrice(arr4, filters.minPrice, filters.maxPrice);
  currentGoodsArray = getCatalogByRating(arr5, filters.minRating, filters.maxRating);
  renderCatalog(currentGoodsArray);
  //addGoodsToCart();
  //updateRangeInputs(currentGoodsArray);
  //updateHash();
  //console.log('filers:::', filters);
}
//updateAllFilters()

// сброс всех фильтров

const resetFiltersBtn: HTMLElement | null = document.querySelector('.reset-filter-btn');
resetFiltersBtn?.addEventListener('click', resetAllFilters);

function resetAllFilters(): void {
  currentGoodsArray = catalog.products;
  sortOption = '0';
  filters.sortBy = sortOption;
  if (goodsSortSelect) {
    goodsSortSelect.value = '0';
  }
  searchFrase = '';
  if (searchInput) {
    searchInput.value = '';
  }
  filters.contains = '';
  filters.brand = [];
  filters.category = [];
  filters.minPrice = SLIDER_MIN_PRICE;
  filters.maxPrice = SLIDER_MAX_PRICE;
  filters.minRating = 0;
  filters.maxRating = SLIDER_MAX_RATING;
  renderCatalog(rawCatalog);
  if (sliderOne) {
    sliderOne.value = SLIDER_MIN_PRICE.toString();
  }
  if (sliderTwo) {
    sliderTwo.value = SLIDER_MAX_PRICE.toString();
  }
  slideOne();
  slideTwo();
  if (sliderThree) {
    sliderThree.value = (0).toString();
  }
  if (sliderFour) {
    sliderFour.value = (5).toString();
  }
  slideThree();
  slideFour();
  categoriesLiArr?.forEach((el) => el.classList.remove('selected-filter'));
  brandsLiArr?.forEach((el) => el.classList.remove('selected-filter'));
  //updateAllFilters();
}

// вспом функции

export function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  el.className = className;
  el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}

function sortGoodsArray(arr: types.IGoodsItem[], sortOption: string) {
  if (sortOption === '0') {
    arr.sort((a, b) => a.id - b.id);
  } else if (sortOption === '1') {
    arr.sort((a, b) => a.price - b.price);
  } else if (sortOption === '2') {
    arr.sort((a, b) => b.price - a.price);
  } else if (sortOption === '3') {
    arr.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === '4') {
    arr.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === '5') {
    arr.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      if (a.title === b.title) {
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
      }
      return 0;
    });
  } else if (sortOption === '6') {
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

function searchGoods(arr: types.IGoodsItem[], searchFrase: string) {
  if (searchFrase.trim() === '') {
    return arr;
  }
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

  return searchArr;
}

function getGoodsBySelectedCategories(arr: types.IGoodsItem[], selectedCategories: string[]) {
  if (selectedCategories.length === 0) {
    return arr;
  }
  const sortArr = arr.filter((el: types.IGoodsItem) => selectedCategories.includes(el.category));
  return sortArr;
}

function getGoodsBySelectedFilters(arr: types.IGoodsItem[], selectedBrands: string[]) {
  if (selectedBrands.length === 0) {
    return arr;
  }
  const sortArr = arr.filter((el: types.IGoodsItem) => selectedBrands.includes(el.brand));
  return sortArr;
}

// function updateRangeInputs(arr: types.IGoodsItem[]) {

//   let minCurrentPrice: number;
//   let maxCurrentPrice: number;
//   let minCurrentRating: number;
//   let maxCurrentRating: number;

//   if (filters.category.length === 0 && filters.brand.length === 0 && filters.contains === '') {
//     minCurrentPrice = SLIDER_MIN_PRICE;
//     maxCurrentPrice = SLIDER_MAX_PRICE;
//     minCurrentRating = 0;
//     maxCurrentRating = SLIDER_MAX_RATING;
//     filters.minPrice = minCurrentPrice;
//     filters.maxPrice = maxCurrentPrice;
//     filters.minRating = minCurrentRating;
//     filters.maxRating = maxCurrentRating;
//   } else {
//     minCurrentPrice = arr.map((el) => el.price).sort((a, b) => a - b)[0];
//     maxCurrentPrice = arr.map((el) => el.price).sort((a, b) => b - a)[0];
//     minCurrentRating = arr.map((el) => el.rating).sort((a, b) => a - b)[0];
//     maxCurrentRating = arr.map((el) => el.rating).sort((a, b) => b - a)[0];
//   }

//   sliderOne!.value = minCurrentPrice.toString();
//   sliderTwo!.value = maxCurrentPrice.toString();
//   slideOne();
//   slideTwo();
//   sliderThree!.value = minCurrentRating.toString();
//   sliderFour!.value = maxCurrentRating.toString();
//   slideThree();
//   slideFour();
//   console.log('filers:::', filters);
// }
