import './burger.scss';

export const burgerMenuBtn: Element | null = document.querySelector('.burger-menu-btn');
const filtersWrapper: Element | null = document.querySelector('.filters');
const goods: Element | null = document.querySelector('.goods');

if (burgerMenuBtn) {
  burgerMenuBtn.addEventListener('click', () => {
    if (filtersWrapper) {
      filtersWrapper.classList.toggle('filters-up');
    }
  });
}

if (goods) {
  goods.addEventListener('click', () => {
    if (filtersWrapper) {
      filtersWrapper.classList.remove('filters-up');
    }
  });
}
