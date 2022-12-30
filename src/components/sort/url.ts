import * as types from '../types';
import { filters } from './sort';
import { getCartPage, getErrorPage, getMainPage, getGoodCardFromUrl } from '../sort/navigation';
import { updateBuyButtonState } from '../payment/payment';

window.addEventListener('popstate', (event) => { 
  updateState(event.state);
})

export interface Itest {
  page: string | null;
  main: string | null;  
}

export let state: Itest;

export function getPageByHref (event: Event) {  
  if (event) {
    console.log('event.target:::', event.target);
    
    state = {
      page: (event.target as HTMLElement).getAttribute('href'),
      main: 'main',
    }
    console.log('state.page:::', state.page);
    history.pushState(state, '', state.page);
    updateState(state);
    event.preventDefault();
  }
}


export function updateState(state: Itest) {
  if (state && state.page) {
    const pageName = state.page;
    console.log('pageName:::', pageName); 
    if (pageName === 'main' || pageName === '') getMainPage();
    else if (pageName === 'cart') getCartPage();
    else if (pageName.length === 6 && pageName.slice(0, 3) === 'id=') getGoodCardFromUrl(pageName.slice(3, 6));
    else getErrorPage();
  }
}

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
 
 
 