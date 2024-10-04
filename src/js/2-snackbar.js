import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);
function createPromise(evt) {
  evt.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;

  form.reset();

  newPromise(delay, state)
    .then(value => {
      iziToast.success({
        message: value,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topRight',
      });
    });
}

function newPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
