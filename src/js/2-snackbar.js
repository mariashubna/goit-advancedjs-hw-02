import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formInput = document.querySelector('.form label input');
const fieldset = document.querySelector('.form fieldset');
const form = document.querySelector('.form');

let delay;
let statusPromise;

formInput.addEventListener('blur', readDelay);
function readDelay(e) {
  delay = e.target.value;
}

fieldset.addEventListener('click', changeStatusPromise);
function changeStatusPromise(e) {
  if (e.target.tagName !== 'INPUT') {
    return;
  }
  statusPromise = e.target.value;
}

form.addEventListener('submit', createPromise);
function createPromise(evt) {
  evt.preventDefault();
  form.reset();  
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statusPromise === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  console.log(promise);
  promise
    .then(value => {
      iziToast.success({
        title: 'Success',
        message: value,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
      });
    });
      
}
