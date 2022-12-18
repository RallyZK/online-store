import catalog from '../../assets/catalog';

// window.onload = function () {
//   renderCategory();
// };

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

interface IAcc {
  [key: string]: number;
}

const catalogArr: IGoodsItem[] = catalog.products;

const categories = catalogArr.reduce((acc: IAcc, el: IGoodsItem) => {
  if (el.category in acc) acc[el.category] += 1;
  else acc[el.category] = 1;
  return acc;
}, {});

const brands = catalogArr.reduce((acc: IAcc, el: IGoodsItem) => {
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

// render category HTML

const filtersItemUlCategory: HTMLElement | null = document.querySelector('.categories');
let filtersItemLiCategory: HTMLElement | null;
let filtersItemPNameCategory: HTMLElement | null;
let filtersItemPStockCategory: HTMLElement | null;
let filtersSpanCurStockCategory: HTMLElement | null;
let filtersSpanAllStockCategory: HTMLElement | null;

function renderCategory() {
  for (let key in categories) {
    if (filtersItemUlCategory) {
      filtersItemLiCategory = createElements('filters__item__li', 'li', filtersItemUlCategory, '');
      filtersItemLiCategory.setAttribute('item-category', `${key}`);
      filtersItemPNameCategory = createElements('filters__item__name', 'p', filtersItemLiCategory, `${key[0].toUpperCase()}${key.slice(1, key.length)}`);
      filtersItemPStockCategory = createElements('filters__item__stock', 'p', filtersItemLiCategory, '');
      filtersSpanCurStockCategory = createElements('filters__category-span', 'span', filtersItemPStockCategory, `${categories[key]}`);
      filtersSpanAllStockCategory = createElements('', 'span', filtersItemPStockCategory, ` / ${categories[key]}`);
    }
  }
}
renderCategory();

// render brands HTML

const filtersItemUlBrands: HTMLElement | null = document.querySelector('.brands');
let filtersItemLiBrands: HTMLElement | null;
let filtersItemPNameBrands: HTMLElement | null;
let filtersItemPStockBrands: HTMLElement | null;
let filtersSpanCurStockBrands: HTMLElement | null;
let filtersSpanAllStockBrands: HTMLElement | null;

function renderBrands() {
  for (let key in brands) {
    if (filtersItemUlBrands) {
      filtersItemLiBrands = createElements('filters__item__li', 'li', filtersItemUlBrands, '');
      filtersItemLiBrands.setAttribute('item-brand', `${key}`);
      filtersItemPNameBrands = createElements('filters__item__name', 'p', filtersItemLiBrands, `${key[0].toUpperCase()}${key.slice(1, key.length)}`);
      filtersItemPStockBrands = createElements('filters__item__stock', 'p', filtersItemLiBrands, '');
      filtersSpanCurStockBrands = createElements('filters__brands-span', 'span', filtersItemPStockBrands, `${brands[key]}`);
      filtersSpanAllStockBrands = createElements('', 'span', filtersItemPStockBrands, ` / ${brands[key]}`);
    }
  }
}
renderBrands();
console.log(brands);
