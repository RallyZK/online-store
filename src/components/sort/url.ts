import * as types from '../types';
import { filters } from './sort';
import { getCartPage, getErrorPage, getMainPage, getGoodCardFromUrl } from '../sort/navigation';

window.addEventListener('hashchange', updateHash);
//window.onload = () => updateHash();

function renderUrl (filters: types.IFilters): string {
  return Object.entries(filters).map(el => el.join('=')).join('&');  
}


const urlSearchParams = new URLSearchParams(renderUrl(filters));
const params = Object.fromEntries(urlSearchParams.entries());


console.log(urlSearchParams.toString());
console.log(params);




export function updateHash (): void {
  const hash = window.location.hash.slice(1);
  console.log('hash:::', hash);
 // window.location.search = renderUrl(filters);
  if (hash === '') getMainPage();
  else if (hash === 'cart') getCartPage();
  else if (hash.length === 6 && hash.slice(0, 3).includes('id=')) getGoodCardFromUrl(hash);
  else getErrorPage()
 
}


// function getDataFromUrl(stringFromUrl: string) {
//    let res: types.IFilters;
 
//   //  const arr1: string[] = stringFromUrl.split(';');
//   //  const arr2: string[][] = arr1.map((el) => el.split('='));
//   //  // const arr3: string[][] = arr2.map((el) => {
//   //  //   el[1] = el[1].split(',');
//   //  //   return el
//   //  // })
//   //  const arr3 = arr2.forEach(el => {
//   //    if (el[1].length < 2) res[el[0]] = el[1].join('');
//   //    else res[el[0]] = el[1];
//   //  });
 
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
 
 
 