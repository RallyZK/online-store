import './burger.scss';

const burgerMenuBtn = document.querySelector('.burger-menu-btn');
const filtersWrapper = document.querySelector('.filters');
const goods = document.querySelector('.goods');

burgerMenuBtn?.addEventListener('click', () => {
  filtersWrapper!.classList.toggle('filters-up');
})

goods?.addEventListener('click', () => {
  filtersWrapper!.classList.remove('filters-up');
})