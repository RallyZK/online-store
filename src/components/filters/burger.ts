import './burger.scss';

const burgerMenuBtn: Element | null = document.querySelector('.burger-menu-btn');
const filtersWrapper: Element | null = document.querySelector('.filters');
const goods: Element | null = document.querySelector('.goods');

burgerMenuBtn?.addEventListener('click', () => {
  filtersWrapper!.classList.toggle('filters-up');
});

goods?.addEventListener('click', () => {
  filtersWrapper!.classList.remove('filters-up');
});
