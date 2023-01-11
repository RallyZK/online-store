import { getCartPage, getErrorPage, getMainPage, getGoodCardFromUrl } from '../sort/navigation';

window.addEventListener('hashchange', updateHash);
window.addEventListener('load', updateHash);

export function updateHash(): void {
  const hash = window.location.hash.slice(1);
  if (hash === '') getMainPage();
  else if (hash === 'cart') getCartPage();
  else if (hash.length === 6 && hash.includes('id=')) getGoodCardFromUrl(hash);
  else getErrorPage();
}
