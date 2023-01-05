import * as types from '../types';
import { filters } from './sort';
import { getCartPage, getErrorPage, getMainPage, getGoodCardFromUrl } from '../sort/navigation';
import { updateBuyButtonState } from '../payment/payment';
import { SLIDER_MAX_PRICE, SLIDER_MIN_PRICE } from '../filters/filters';

window.addEventListener('popstate', (event) => {
  updateState(event.state);  
});
window.addEventListener('load', updatePageDataByUrl);

export interface Itest {
  page: string | null;  
}

export let state: Itest;

export function getPageByHref (event: Event) {  
  if (event) {    
    state = {
      page: (event.target as HTMLElement).getAttribute('href'),      
    }    
    history.pushState(state, '', state.page);
    updateState(state);
    event.preventDefault();
  }
}

export function updateState(state: Itest): void {
  if (state && state.page) {
    const pageName = state.page;
    console.log('pageName:::', pageName); 
    getPages(pageName);    
  }
}

function updatePageDataByUrl(): void {  
  const pathname = window.location.pathname.slice(1);
  console.log('pathname:::', pathname);
  getPages(pathname) 
}


function getPages(pageName: string): void {
  if (pageName === 'main' || pageName === '') getMainPage();
  else if (pageName === 'cart') getCartPage();
  else if (pageName.length === 6 && pageName.slice(0, 3) === 'id=') getGoodCardFromUrl(pageName.slice(3, 6));
  else getErrorPage();
}

export function renderUrl (filters: types.IFilters): string {
  console.log('filters:::', filters);
  //const url = Object.entries(filters).map(el => el.join('=')).join('&');
  
  const arrUrls = [];  
  if (filters.category.length !== 0) arrUrls.push('category=' + filters.category.join(','));
  if (filters.brand.length !== 0) arrUrls.push('brand=' + filters.brand.join(','));
  if (filters.minPrice !== SLIDER_MIN_PRICE) arrUrls.push('minPrice=' + filters.minPrice);
  if (filters.maxPrice !== SLIDER_MAX_PRICE) arrUrls.push('maxPrice=' + filters.maxPrice);
  if (filters.minRating !== 0) arrUrls.push('minRating=' + filters.minRating);
  if (filters.maxRating !== 5) arrUrls.push('maxRating=' + filters.maxRating);
  if (filters.sortBy !== '0') arrUrls.push('sortBy=' + filters.sortBy);
  if (filters.contains) arrUrls.push('contains=' + filters.contains);
  //if (filters.view) arrUrls.push('view=' + filters.view);

  const url = arrUrls.join('&');
  console.log('url:::', url);
  return url;
}

//  const params = new URLSearchParams(renderUrl(filters));
//  const baseUrl = window.location.toString();
//  const fullUrl = new URL('goods', baseUrl)
//  fullUrl.search = params.toString();

//  console.log('params:::', params)
//  console.log('baseUrl:::', baseUrl)
//  console.log('fullUrl:::', fullUrl)



// window.addEventListener('hashchange', updateHash);
// window.addEventListener('load', updateHash);
// //window.onload = () => updateHash();

// function renderUrl (filters: types.IFilters): string {
//   return Object.entries(filters).map(el => el.join('=')).join('&');  
// }

// export function updateHash (): void {
//   const hash = window.location.hash.slice(1);
//   console.log('hash:::', hash);
//  // window.location.search = renderUrl(filters);
//   if (hash === '') getMainPage();
//   else if (hash === 'cart') getCartPage();
//   else if (hash.length === 6 && hash.includes('id=')) getGoodCardFromUrl(hash);
//   else getErrorPage()
 
// }




// function getDataFromUrl(stringFromUrl: string) {
//    let res: types.IFilters;
 
//    const arr1: string[] = stringFromUrl.split(';');
//    const arr2: string[][] = arr1.map((el) => el.split('='));
//    // const arr3: string[][] = arr2.map((el) => {
//    //   el[1] = el[1].split(',');
//    //   return el
//    // })
//    const arr3 = arr2.forEach(el => {
//      if (el[1].length < 2) res[el[0]] = el[1].join('');
//      else res[el[0]] = el[1];
//    });
 
//    const objFromUrl = stringFromUrl
//    .split(';')
//    .map((el: string) => el.split('='))
//    .map((el: string[]) => {
//      el[1] = el[1].split(',');
//      return el;
//    })
//    .forEach(el => {
//      if (el[1].length < 2) res[el[0]] = el[1].join('');
//      else res[el[0]] = el[1];
//    });
 
//  }

 
//  const params = new URLSearchParams(renderUrl(filters));
//  const baseUrl = window.location.toString();
//  const fullUrl = new URL('goods', baseUrl)
//  fullUrl.search = params.toString();

//  console.log('params:::', params)
//  console.log('baseUrl:::', baseUrl)
//  console.log('fullUrl:::', fullUrl)
 
 
 