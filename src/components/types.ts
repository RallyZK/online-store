import { ids } from "webpack";

export interface IGoodsItem {
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

export interface IFilters {
  category: string[],
  brand: string[],
  minPrice: number,
  maxPrice: number,
  minRating: number,
  maxRating: number,
  sortBy: string,
  contains: string,
  view: viewType,
  //[key: string]: string,
}

export type viewType = 'cube' | 'list';

export interface IGoodInCart { 
  count: number,
  item: IGoodsItem | null,
}






// export const burgerMenuBtn: HTMLButtonElement | null = document.querySelector('.burger-menu-btn');
// export const headerTitle: HTMLElement | null = document.querySelector('.header__title');

// export const cartSum: HTMLElement | null = document.querySelector('.header__cart-wrapper__sum');
// export const cartItemCount: HTMLElement | null = document.querySelector('.header__cart-wrapper__items-count');
// export const cartBtn: HTMLButtonElement | null = document.querySelector('.header__cart-wrapper__cart-btn');

// export const categories: HTMLElement | null = document.querySelector('.categories');
// export let categoriesUl: HTMLElement | null;
// if (categories) categoriesUl = categories.querySelector('.filters__item__ul');

// const brands: HTMLElement | null = document.querySelector('.brands');
// export let brandsUl: HTMLElement | null;
// if (brands) brandsUl = brands.querySelector('.filters__item__ul');

// // добавить инпуты

// export const resetFilterBtn: HTMLButtonElement | null = document.querySelector('.reset-filter-btn');
// export const copyLinkBtn: HTMLButtonElement | null = document.querySelector('.copy-link-btn');

// // select

// export const foundItemsCount: HTMLElement | null = document.querySelector('.items-count');

// export const searchInput: HTMLInputElement | null = document.querySelector('.goods__sort-wr__search-wr__input');
// export const searchBtn: HTMLButtonElement | null = document.querySelector('.goods__sort-wr__search-wr__btn');

// export const setListBtn: HTMLButtonElement | null = document.querySelector('.list-view');
// export const setCubeBtn: HTMLButtonElement | null = document.querySelector('.grid-view');

// export const goodsContainer: HTMLElement | null = document.querySelector('.goods__goods-container');

// let a: string;
// if (searchInput !== null) a = searchInput.value

