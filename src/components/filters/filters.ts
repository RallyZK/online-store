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

export let sliderOne: HTMLInputElement | null = document.querySelector('#slider-1');
export let sliderTwo: HTMLInputElement | null = document.querySelector('#slider-2');
export let sliderThree: HTMLInputElement | null = document.querySelector('#slider-3');
export let sliderFour: HTMLInputElement | null = document.querySelector('#slider-4');

let displayValOne: HTMLElement | null = document.querySelector('#rangeOneValue');
let displayValTwo: HTMLElement | null = document.querySelector('#rangeTwoValue');
let displayValThree: HTMLElement | null = document.querySelector('#rangeThreeValue');
let displayValFour: HTMLElement | null = document.querySelector('#rangeFourValue');

const minGap = 0;
let sliderTrack1: HTMLElement | null = document.querySelector('#sliderTrack-1');
let sliderTrack2: HTMLElement | null = document.querySelector('#sliderTrack-2');

export function searchMaxPrice(): number {
  let maxPriceArr = catalog.products.map((el) => el.price).sort((a, b) => b - a);
  return maxPriceArr[0];
}

export function searchMinPrice(): number {
  let maxPriceArr = catalog.products.map((el) => el.price).sort((a, b) => a - b);
  return maxPriceArr[0];
}

// let sliderMinValue1: number = searchMinPrice();
let sliderMaxValue1: number = searchMaxPrice();
let sliderMaxValue3: number = 5;

export function updateSliderOneMaxValue() {
  // if (displayValOne) displayValOne.textContent = sliderMinValue1.toString();
  if (displayValTwo) displayValTwo.textContent = sliderMaxValue1.toString();
  if (sliderOne) sliderOne.max = sliderMaxValue1.toString();
  if (sliderTwo) {
    sliderTwo.max = sliderMaxValue1.toString();
    sliderTwo.value = sliderMaxValue1.toString();
  }
  return sliderMaxValue1;
}

export function slideOne(): string | void {
  if (sliderOne && sliderTwo) {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      console.log('sliderOne.value1:::', sliderOne.value);
      sliderOne.value = (parseInt(sliderTwo.value) - minGap).toString();
      console.log('sliderOne.value2:::', sliderOne.value);
    }
    if (displayValOne) displayValOne.textContent = sliderOne.value;
  }
  fillColor();
  //if (sliderOne) return sliderOne.value;
}

export function slideTwo(): string | void {
  console.log('slideTwo():::', 'slideTwo()');
  if (sliderOne && sliderTwo) {
    console.log('sliderOne && sliderTwo:::', sliderTwo);
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      console.log('sliderTwo.value1:::', sliderTwo.value);
      sliderTwo.value = (parseInt(sliderOne.value) + minGap).toString();
      console.log('sliderTwo.value2:::', sliderTwo.value);
    }
    if (displayValTwo) displayValTwo.textContent = sliderTwo.value;
  }
  fillColor();
  //if (sliderTwo) return sliderTwo.value;
}

export function slideThree(): string | void {
  if (sliderThree && sliderFour) {
    if (Number(sliderFour.value) - Number(sliderThree.value) <= minGap) {
      sliderThree.value = (Number(sliderFour.value) - minGap).toString();
    }
    if (displayValThree) displayValThree.textContent = sliderThree.value;
  }
  fillColor();
  //if (sliderThree) return sliderThree.value;
}

export function slideFour(): string | void {
  if (sliderThree && sliderFour) {
    if (Number(sliderFour.value) - Number(sliderThree.value) <= minGap) {
      sliderFour.value = (Number(sliderThree.value) + minGap).toString();
    }
    if (displayValFour) displayValFour.textContent = sliderFour.value;
  }
  fillColor();
  //if (sliderFour) return sliderFour.value;
}

function fillColor() {
  if (sliderOne && sliderTwo && sliderThree && sliderFour && sliderTrack1 && sliderTrack2) {
    const percent1: number = (Number(sliderOne.value) / sliderMaxValue1) * 100;
    const percent2: number = (Number(sliderTwo.value) / sliderMaxValue1) * 100;

    const percent3: number = (Number(sliderThree.value) / sliderMaxValue3) * 100;
    const percent4: number = (Number(sliderFour.value) / sliderMaxValue3) * 100;

    sliderTrack1.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3482a1 ${percent1}% , #3482a1 ${percent2}%, #dadae5 ${percent2}%)`;
    sliderTrack2.style.background = `linear-gradient(to right, #dadae5 ${percent3}% , #3482a1 ${percent3}% , #3482a1 ${percent4}%, #dadae5 ${percent4}%)`;
  }
}

// if (sliderOne)
//   sliderOne.onchange = () => {
//     slideOne();
//   };
// if (sliderTwo)
//   sliderTwo.onchange = () => {
//     slideTwo();
//   };
// if (sliderThree)
//   sliderThree.onchange = () => {
//     slideThree();
//   };
// if (sliderFour)
//   sliderFour.onchange = () => {
//     slideFour();
//   };
