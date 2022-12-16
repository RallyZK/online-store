import catalog from '../catalog';

window.onload = function () {
  slideOne();
  slideTwo();
  slideThree();
  slideFour();
};

slideOne();
slideTwo();
slideThree();
slideFour();
// document.addEventListener('DOMContentLoaded', () => {
//   slideOne();
//   slideTwo();
//   slideThree();
//   slideFour();
// });

let sliderOne = document.getElementById('slider-1');
let sliderTwo = document.getElementById('slider-2');
let sliderThree = document.getElementById('slider-3');
let sliderFour = document.getElementById('slider-4');

let displayValOne = document.getElementById('rangeOneValue');
let displayValTwo = document.getElementById('rangeTwoValue');
let displayValThree = document.getElementById('rangeThreeValue');
let displayValFour = document.getElementById('rangeFourValue');

const minGap = 0;
let sliderTrack1 = document.getElementById('sliderTrack-1');
let sliderTrack2 = document.getElementById('sliderTrack-2');

function searchMaxPrice() {
  let maxPriceArr = catalog.products.map((el) => el.price).sort((a, b) => b - a);
  return maxPriceArr[0];
}

let sliderMaxValue1 = searchMaxPrice();
let sliderMaxValue3 = 5;
(displayValTwo as HTMLElement).innerHTML = sliderMaxValue1.toString();
(sliderOne as HTMLInputElement).max = sliderMaxValue1.toString();
(sliderTwo as HTMLInputElement).max = (sliderOne as HTMLInputElement).max;

let sliderOneValue = (sliderOne as HTMLInputElement).value;
let sliderTwoValue = (sliderTwo as HTMLInputElement).value;
let sliderThreeValue = (sliderThree as HTMLInputElement).value;
let sliderFourValue = (sliderFour as HTMLInputElement).value;
console.log('dsfddddddd', sliderOneValue);

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
  const percent1 = (parseInt(sliderOneValue) / sliderMaxValue1) * 100;
  const percent2 = (parseInt(sliderTwoValue) / sliderMaxValue1) * 100;
  const percent3 = (parseInt(sliderThreeValue) / sliderMaxValue3) * 100;
  const percent4 = (parseInt(sliderFourValue) / sliderMaxValue3) * 100;
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
