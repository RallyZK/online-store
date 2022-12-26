import './payment.scss';
import '../../assets/styles/additionals.scss';
import { getMainPage } from '../sort/navigation';

const phonePattern = new RegExp('^([+]+[s0-9]+)?(d{3}|[+]+[(]?[0-9]+[)])?([+]?[s]?[0-9])+$');
const emailPattern = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,5})$');

const paymentPage: HTMLElement | null = document.querySelector('.payment-page-section');
const paymentPageCard: HTMLInputElement | null = document.querySelector('.payment-page__card');
const cardPage: HTMLElement | null = document.querySelector('#cart-page');
const goodPage: HTMLElement | null = document.querySelector('#good-page');
const name: HTMLInputElement | null = document.querySelector('#name');
const phone: HTMLInputElement | null = document.querySelector('#phone');
const adress: HTMLInputElement | null = document.querySelector('#adress');
const email: HTMLInputElement | null = document.querySelector('#email');
const cardNumber: HTMLInputElement | null = document.querySelector('#card-number');
const cardDateMM: HTMLInputElement | null = document.querySelector('#cardDateMM');
const cardDateYY: HTMLInputElement | null = document.querySelector('#cardDateYY');
const cvv: HTMLInputElement | null = document.querySelector('#cvv');
const cardImg: HTMLImageElement | null = document.querySelector('.payment-page__card__number-cont__img');
const confirmBtn: HTMLButtonElement | null = document.querySelector('.payment-page__confirm-btn');

let isNameValid = false;
let isPhoneValid = false;
let isAdressValid = false;
let isEmailValid = false;
let isCardNumberValid = false;
let isCardDateValid = false;
let isCvvValid = false;
let isAllPaymentPageValid = false;

export function displayPaymentPage(): void {
  if (paymentPage != null) paymentPage.classList.remove('display-none');
  if (cardPage != null) cardPage.classList.add('display-none');
  if (goodPage != null) goodPage.classList.add('display-none');
}

if (document.querySelector('.cart-summary__buy-btn') as HTMLButtonElement) {
  (document.querySelector('.cart-summary__buy-btn') as HTMLButtonElement).onclick = () => displayPaymentPage();
}

function checkName(name: string): Boolean {
  const nameArr = name.trimStart().trimEnd().split(' ');
  if (nameArr.length > 1 && nameArr.filter((el) => el.length > 2).length > 1) isNameValid = true;
  else isNameValid = false;
  return isNameValid;
}

phone!.oninput = () => {
  if (phone!.value.length > 16) {
    phone!.value = phone!.value.slice(0, 16);
  }
};

function checkPhone(phone: string): Boolean {
  if (phonePattern.test(phone) && phone.length > 10 && phone.length < 17) isPhoneValid = true;
  else isPhoneValid = false;
  return isPhoneValid;
}

function checkAdress(adress: string): Boolean {
  const adressArr = adress.trimStart().trimEnd().split(' ');
  if (adressArr.length > 2 && adressArr.filter((el) => el.length > 4).length > 2) isAdressValid = true;
  else isAdressValid = false;
  return isAdressValid;
}

function checkEmail(email: string): Boolean {
  if (emailPattern.test(email) && email.length > 3) isEmailValid = true;
  else isEmailValid = false;
  return isEmailValid;
}

cardNumber!.oninput = () => {
  if (cardNumber!.value.length > 16) {
    cardNumber!.value = cardNumber!.value.slice(0, 16);
  }
};

function checkCardNumber(cardNumber: string): Boolean {
  const arr = cardNumber.toString().split('');
  changeCardImg(arr[0]);
  let res;
  if (arr.length % 2 === 0) {
    res = arr.map((el, i) => {
      if (i % 2 === 0) return (+el * 2).toString().split('');
      return el;
    });
  } else {
    res = arr.map((el, i) => {
      if (i % 2 !== 0) return (+el * 2).toString().split('');
      return el;
    });
  }
  isCardNumberValid = res.flat().reduce((acc, cur) => acc + +cur, 0) % 10 === 0;
  if (cardNumber.toString().length !== 16) isCardNumberValid = false;
  return isCardNumberValid;
}

function changeCardImg(el: string) {
  const num = +el;
  if (num === 2) cardImg!.src = '../../assets/icons/card-mir.png';
  else if (num === 3) cardImg!.src = '../../assets/icons/card-amex.png';
  else if (num === 4) cardImg!.src = '../../assets/icons/card-visa.png';
  else if (num === 5) cardImg!.src = '../../assets/icons/card-mastercard.png';
  else cardImg!.src = '../../assets/icons/card-default.png';
}

cardDateMM!.oninput = () => {
  if (cardDateMM!.value.length >= 2) {
    cardDateMM!.value = cardDateMM!.value.slice(0, 2);
    cardDateYY!.focus();
  }
};

cardDateYY!.oninput = () => {
  if (cardDateYY!.value.length >= 2) {
    cardDateYY!.value = cardDateYY!.value.slice(0, 2);
    cvv!.focus();
  }
};

function checkCardDate(): Boolean {
  const curDate = new Date();
  const year = curDate.getFullYear();
  if (
    cardDateMM!.value.length === 2 &&
    Number(cardDateMM!.value) <= 12 &&
    Number(cardDateMM!.value) >= 1 &&
    Number(cardDateYY!.value) >= Number(year.toString().slice(2, 4))
  )
    isCardDateValid = true;
  else isCardDateValid = false;
  return isCardDateValid;
}

cvv!.oninput = () => {
  if (cvv!.value.length > 3) {
    cvv!.value = cvv!.value.slice(0, 3);
  }
};

function checkCvv(cvv: string): Boolean {
  if (+cvv >= 1 && cvv.length === 3) isCvvValid = true;
  else isCvvValid = false;
  return isCvvValid;
}

function checkCardValid() {
  const textIsCardValid = document.querySelector('.checkCardValid');
  if (isCvvValid && isCardDateValid && isCardNumberValid) {
    textIsCardValid!.innerHTML = 'Card is valid';
    paymentPageCard?.classList.add('valid-card');
  } else {
    textIsCardValid!.innerHTML = 'Card is invalid';
    paymentPageCard?.classList.remove('valid-card');
  }
}

paymentPage!.oninput = () => {
  checkName(name!.value);
  checkPhone(phone!.value);
  checkAdress(adress!.value);
  checkEmail(email!.value);
  checkCardNumber(cardNumber!.value);
  checkCardDate();
  checkCvv(cvv!.value);
  checkCardValid();
};

function checkAllPaymentPageValid() {
  if (isNameValid) document.querySelector('.name-error')!.classList.add('display-none');
  else document.querySelector('.name-error')!.classList.remove('display-none');

  if (isPhoneValid) document.querySelector('.phone-error')!.classList.add('display-none');
  else document.querySelector('.phone-error')!.classList.remove('display-none');

  if (isAdressValid) document.querySelector('.adress-error')!.classList.add('display-none');
  else document.querySelector('.adress-error')!.classList.remove('display-none');

  if (isEmailValid) document.querySelector('.email-error')!.classList.add('display-none');
  else document.querySelector('.email-error')!.classList.remove('display-none');

  if (isNameValid && isPhoneValid && isAdressValid && isEmailValid && paymentPageCard?.classList.contains('valid-card')) isAllPaymentPageValid = true;
  else if (!isNameValid && !isPhoneValid && !isAdressValid && !isEmailValid && !paymentPageCard?.classList.contains('valid-card')) isAllPaymentPageValid = false;
}

confirmBtn!.onclick = () => {
  checkAllPaymentPageValid();
  if (isAllPaymentPageValid) {
    paymentPage?.classList.add('display-none');
    document.querySelector('.paid-page__wrapper')?.classList.remove('display-none');
    setTimeout(getMainPage, 8000);
  }
};
