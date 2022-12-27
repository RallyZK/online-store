import catalog from '../../assets/catalog';
import * as types from '../types';

interface IAcc {
  [key: string]: number;
}

const catalogArr: types.IGoodsItem[] = catalog.products;

const categories: IAcc = catalogArr.reduce((acc: IAcc, el: types.IGoodsItem) => {
  if (el.category in acc) acc[el.category] += 1;
  else acc[el.category] = 1;
  return acc;
}, {});

const brands: IAcc = catalogArr.reduce((acc: IAcc, el: types.IGoodsItem) => {
  if (el.brand in acc) acc[el.brand] += 1;
  else acc[el.brand] = 1;
  return acc;
}, {});

function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  el.className = className;
  el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}

// render category HTML-elements

const filtersItemUlCategory: HTMLElement | null = document.querySelector('.categories');

function renderCategory(): void {
  for (let key in categories) {
    if (filtersItemUlCategory) {
      const filtersItemLiCategory = createElements('filters__item__li', 'li', filtersItemUlCategory, '');
      filtersItemLiCategory.setAttribute('item-category', `${key}`);
      createElements('filters__item__name', 'p', filtersItemLiCategory, `${key[0].toUpperCase()}${key.slice(1, key.length)}`);
      const filtersItemPStockCategory = createElements('filters__item__stock', 'p', filtersItemLiCategory, '');
      createElements('filters__category-span', 'span', filtersItemPStockCategory, `${categories[key]}`);
      createElements('', 'span', filtersItemPStockCategory, ` / ${categories[key]}`);
    }
  }
}
renderCategory();

// render brands HTML-elements

const filtersItemUlBrands: HTMLElement | null = document.querySelector('.brands');

function renderBrands(): void {
  for (let key in brands) {
    if (filtersItemUlBrands) {
      const filtersItemLiBrands = createElements('filters__item__li', 'li', filtersItemUlBrands, '');
      filtersItemLiBrands.setAttribute('item-brand', `${key}`);
      createElements('filters__item__name', 'p', filtersItemLiBrands, `${key[0].toUpperCase()}${key.slice(1, key.length)}`);
      const filtersItemPStockBrands = createElements('filters__item__stock', 'p', filtersItemLiBrands, '');
      createElements('filters__brands-span', 'span', filtersItemPStockBrands, `${brands[key]}`);
      createElements('', 'span', filtersItemPStockBrands, ` / ${brands[key]}`);
    }
  }
}
renderBrands();
