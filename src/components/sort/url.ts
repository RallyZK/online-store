import * as types from '../types';
import { getCartPage, getErrorPage, getMainPage, getGoodCardFromUrl } from '../sort/navigation';
import { SLIDER_MIN_PRICE, SLIDER_MAX_PRICE } from '../filters/filters';
import { filters, updateAllFilters } from '../sort/sort';

window.addEventListener('hashchange', getPageByHash);
window.addEventListener('load', () => {
  getPageByHash();  
});

export function getPageByHash(): void {
  const hash = window.location.hash.slice(1);  
  if (hash === '') getMainPage();
  else if (hash === 'cart') getCartPage();
  else if (hash.length === 6 && hash.includes('id=')) getGoodCardFromUrl(hash);
  // else getErrorPage()
}

// function setMainPageByFiltersFromHash(hash: string) {  
//   getMainPage();
//   getFiltersFromUrl(hash);
//   updateAllFilters();
// }

interface IRes {
  [key: string]: string[] | string | number;
}

export function renderUrl(filters: types.IFilters): string {
  console.log('filters in renderUrl:::', filters);
  //const url = Object.entries(filters).map(el => el.join('=')).join('&');

  const arrUrls: string[] = [];
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

// function getFiltersFromUrl(stringFromUrl: string) {
//   let res: IRes = {};
//   const arr1 = stringFromUrl.split('&').map((el: string) => el.split('='));
//   let arr2: [string, string[]][] = [];
//   arr1.forEach((el: string[]) => {
//     arr2.push([el[0], el[1].split(',')]);
//   });
//   arr2.forEach(el => {
//     if (el[1].length < 2) {
//       if (el[0] === 'minPrice' || el[0] === 'maxPrice' || el[0] === 'minRating' || el[0] === 'maxRating') {
//         res[el[0]] = Number(el[1].join(''));
//       } else {
//         res[el[0]] = el[1].join('');
//       }
//     } else {
//         res[el[0]] = el[1];
//      }
//   });
//   console.log('res:::', res);

//   for (let key in filters) {    
//     if (res[key]) filters[key] = res[key];    
//   }
//   console.log('filters in getDataFromUrl:::', filters);
// }


// function getFiltersFromUrl() {
//   const urlSearchParams = new URLSearchParams(window.location.hash);
//   const params = Object.fromEntries(urlSearchParams.entries());
//   console.log('params getFiltersFromUrl:::', params);
// }

//  const params = new URLSearchParams(renderUrl(filters));
//  const baseUrl = window.location.toString();
//  const fullUrl = new URL('goods', baseUrl)
//  fullUrl.search = params.toString();

//  console.log('params:::', params)
//  console.log('baseUrl:::', baseUrl)
//  console.log('fullUrl:::', fullUrl)


