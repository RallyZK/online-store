import catalog from '../../assets/catalog';
import './filters.scss';
import './burger.scss';

window.onload = function () {
  updateSliderOneMaxValue();
  slideOne();
  slideTwo();
  slideThree();
  slideFour();
};

export const sliderOne: HTMLInputElement | null = document.querySelector('#slider-1');
export const sliderTwo: HTMLInputElement | null = document.querySelector('#slider-2');
export const sliderThree: HTMLInputElement | null = document.querySelector('#slider-3');
export const sliderFour: HTMLInputElement | null = document.querySelector('#slider-4');

const displayValOne: HTMLElement | null = document.querySelector('#rangeOneValue');
const displayValTwo: HTMLElement | null = document.querySelector('#rangeTwoValue');
const displayValThree: HTMLElement | null = document.querySelector('#rangeThreeValue');
const displayValFour: HTMLElement | null = document.querySelector('#rangeFourValue');

const MIN_GAP: number = 0;
const sliderTrack1: HTMLElement | null = document.querySelector('#sliderTrack-1');
const sliderTrack2: HTMLElement | null = document.querySelector('#sliderTrack-2');

export const SLIDER_MAX_PRICE: number = catalog.products.map((el) => el.price).sort((a, b) => b - a)[0];
export const SLIDER_MIN_PRICE: number = catalog.products.map((el) => el.price).sort((a, b) => a - b)[0];
export const SLIDER_MAX_RATING: number = 5;

export function updateSliderOneMaxValue(): number {
  if (displayValTwo) {
    displayValTwo.textContent = SLIDER_MAX_PRICE.toString();
  }
  if (sliderOne) {
    sliderOne.max = SLIDER_MAX_PRICE.toString();
  }
  if (sliderTwo) {
    sliderTwo.max = SLIDER_MAX_PRICE.toString();
    sliderTwo.value = SLIDER_MAX_PRICE.toString();
  }
  return SLIDER_MAX_PRICE;
}

export function slideOne(): string | void {
  if (sliderOne && sliderTwo) {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= MIN_GAP) {
      sliderOne.value = (parseInt(sliderTwo.value) - MIN_GAP).toString();
    }
    if (displayValOne) {
      displayValOne.textContent = sliderOne.value;
    }
  }
  fillColor();
}

export function slideTwo(): string | void {
  if (sliderOne && sliderTwo) {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= MIN_GAP) {
      sliderTwo.value = (parseInt(sliderOne.value) + MIN_GAP).toString();
    }
    if (displayValTwo) {
      displayValTwo.textContent = sliderTwo.value;
    }
  }
  fillColor();
}

export function slideThree(): string | void {
  if (sliderThree && sliderFour) {
    if (Number(sliderFour.value) - Number(sliderThree.value) <= MIN_GAP) {
      sliderThree.value = (Number(sliderFour.value) - MIN_GAP).toString();
    }
    if (displayValThree) {
      displayValThree.textContent = sliderThree.value;
    }
  }
  fillColor();
}

export function slideFour(): string | void {
  if (sliderThree && sliderFour) {
    if (Number(sliderFour.value) - Number(sliderThree.value) <= MIN_GAP) {
      sliderFour.value = (Number(sliderThree.value) + MIN_GAP).toString();
    }
    if (displayValFour) {
      displayValFour.textContent = sliderFour.value;
    }
  }
  fillColor();
}

function fillColor() {
  if (sliderOne && sliderTwo && sliderThree && sliderFour && sliderTrack1 && sliderTrack2) {
    const percent1: number = (Number(sliderOne.value) / SLIDER_MAX_PRICE) * 100;
    const percent2: number = (Number(sliderTwo.value) / SLIDER_MAX_PRICE) * 100;

    const percent3: number = (Number(sliderThree.value) / SLIDER_MAX_RATING) * 100;
    const percent4: number = (Number(sliderFour.value) / SLIDER_MAX_RATING) * 100;

    sliderTrack1.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #000000 ${percent1}% , #000000 ${percent2}%, #dadae5 ${percent2}%)`;
    sliderTrack2.style.background = `linear-gradient(to right, #dadae5 ${percent3}% , #000000 ${percent3}% , #000000 ${percent4}%, #dadae5 ${percent4}%)`;
  }
}
