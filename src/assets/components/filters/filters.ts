import catalog from '../catalog';

window.onload = function () {
  slideOne();
  slideTwo();
  slideThree();
  slideFour();
};

// document.addEventListener('DOMContentLoaded', () => {
//   slideOne();
//   slideTwo();
//   slideThree();
//   slideFour();
// });

let sliderOne: HTMLInputElement | null = document.querySelector('#slider-1');
let sliderTwo : HTMLInputElement | null = document.querySelector('#slider-2');
let sliderThree : HTMLInputElement | null = document.querySelector('#slider-3');
let sliderFour: HTMLInputElement | null  = document.querySelector('#slider-4');

let displayValOne: HTMLElement | null = document.querySelector('#rangeOneValue');
let displayValTwo: HTMLElement | null= document.querySelector('#rangeTwoValue');
let displayValThree: HTMLElement | null = document.querySelector('#rangeThreeValue');
let displayValFour: HTMLElement | null = document.querySelector('#rangeFourValue');

const minGap = 0;
let sliderTrack1: HTMLElement | null  = document.querySelector('#sliderTrack-1');
let sliderTrack2: HTMLElement | null  = document.querySelector('#sliderTrack-2');

function searchMaxPrice(): number {
  let maxPriceArr = catalog.products.map((el) => el.price).sort((a, b) => b - a);
  return maxPriceArr[0];
}

let sliderMaxValue1: number = searchMaxPrice();
let sliderMaxValue3: number= 5;
if (displayValTwo) displayValTwo.innerHTML = sliderMaxValue1.toString();
if (sliderOne) sliderOne.max = sliderMaxValue1.toString();
if (sliderTwo) sliderTwo.max = (sliderOne as HTMLInputElement).max;

let sliderOneValue: string;
if (sliderOne) sliderOneValue = sliderOne.value;
let sliderTwoValue: string;
if (sliderTwo) sliderTwoValue = sliderTwo.value;
let sliderThreeValue: string;
if (sliderThree) sliderThreeValue = sliderThree.value;
let sliderFourValue: string;
if (sliderFour) sliderFourValue = sliderFour.value;

function slideOne() {
  if (parseInt(sliderTwoValue) - parseInt(sliderOneValue) <= minGap) {
    sliderOneValue = (parseInt(sliderTwoValue) - minGap).toString();
  }
  if (displayValOne) displayValOne.textContent = sliderOneValue;
  fillColor();
}

function slideTwo() {
  if (parseInt(sliderTwoValue) - parseInt(sliderOneValue) <= minGap) {
    sliderTwoValue = (parseInt(sliderOneValue) + minGap).toString();
  }
  if (displayValTwo) displayValTwo.textContent = sliderTwoValue;
  fillColor();
}

function slideThree() {
  if (parseInt(sliderFourValue) - parseInt(sliderThreeValue) <= minGap) {
    sliderThreeValue = (parseInt(sliderFourValue) - minGap).toString();
  }
  if (displayValThree) displayValThree.textContent = sliderThreeValue;
  fillColor();
}

function slideFour() {
  if (parseInt(sliderFourValue) - parseInt(sliderThreeValue) <= minGap) {
    sliderFourValue = (parseInt(sliderThreeValue) + minGap).toString();
  }
  if (displayValFour) displayValFour.textContent = sliderFourValue;
  fillColor();
}

function fillColor() {
  const percent1: number = (parseInt(sliderOneValue) / sliderMaxValue1) * 100;
  const percent2: number = (parseInt(sliderTwoValue) / sliderMaxValue1) * 100;
  const percent3: number = (parseInt(sliderThreeValue) / sliderMaxValue3) * 100;
  const percent4: number = (parseInt(sliderFourValue) / sliderMaxValue3) * 100;
  if (sliderTrack1) {
    sliderTrack1.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }
  if (sliderTrack2) {
    sliderTrack2.style.background = `linear-gradient(to right, #dadae5 ${percent3}% , #3264fe ${percent3}% , #3264fe ${percent4}%, #dadae5 ${percent4}%)`;
  }
}

// function showVal(newVal){
//   document.getElementById("valBox").innerHTML=newVal;
// }
// <span id="valBox"></span>
// <input type="range" min="5" max="10" step="1" onchange="showVal(this.value)">

// document.addEventListener("DOMContentLoaded", () => {

//   // ======== Slider with one handle

//   const priceSlider = document.getElementById('r-slider');

//   noUiSlider.create(priceSlider, {
//     start: [10, 200],
//     tooltips: true,
//     connect: true,
//     padding: 6,
//     range: {
//       'min': 0,
//       'max': 200
//     },
//     pips: {
//       mode: 'values',
//       values: [50, 100, 150],
//       density: 4
//     }
//   });

//   priceSlider.noUiSlider.on('change', (values, handle) => {
//     goSearch();
//   });

//   // ======== Slider with two handles

//   const discountSlider = document.getElementById('m-slider');

//   noUiSlider.create(discountSlider, {
//     start: 50,
//     tooltips: true,
//     connect: [true, false],
//     step: 1,
//     range: {
//       'min': 0,
//       'max': 100
//     },
//     format: {
//       to: function (value) {
//         return parseInt(value);
//       },
//       from: function (value) {
//         return parseInt(value);
//       }
//     }
//   });

//   discountSlider.noUiSlider.on('change', (values, handle) => {
//     goSearch();
//   });

//   // ======== Search filters

//   function goSearch() {
//     let winHref = window.location.href.split('?')[0];
//     winHref += `?pricerange=${priceSlider.noUiSlider.get()}`;
//     winHref += `&mindiscount=${discountSlider.noUiSlider.get()}`;
//     window.location.href = winHref;
//   }

//   // ======== Slider reset

//   const resetButton = document.getElementById('reset');
//   resetButton.onclick = (e) => {
//     priceSlider.noUiSlider.reset();
//     discountSlider.noUiSlider.reset();
//   };

//   // ======== Slider set

//   const params = new URLSearchParams(window.location.search);
//   const minDiscount = params.get("mindiscount");
//   const priceRange = params.get("pricerange");

//   if (minDiscount) {
//     discountSlider.noUiSlider.set(parseInt(minDiscount));
//   }
//   if (priceRange) {
//     priceSlider.noUiSlider.set(priceRange.split(','));
//   }
// });
