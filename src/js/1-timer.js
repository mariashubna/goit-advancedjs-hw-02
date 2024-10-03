import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', '');
let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date().getTime() >= selectedDates[0].getTime()) {
      startBtn.setAttribute('disabled', '');

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.removeAttribute('disabled', '');
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return {
    days: String(value.days).padStart(2, '0'),
    hours: String(value.hours).padStart(2, '0'),
    minutes: String(value.minutes).padStart(2, '0'),
    seconds: String(value.seconds).padStart(2, '0'),
  };
}

startBtn.addEventListener('click', dataTimer);

function dataTimer(evt) {
  startBtn.setAttribute('disabled', '');
  let userDate = userSelectedDate;

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    let restTime = userDate.getTime() - new Date().getTime();
    let convertTim = convertMs(restTime);
    let convertTime = addLeadingZero(convertTim);
    days.textContent = convertTime.days;
    hours.textContent = convertTime.hours;
    minutes.textContent = convertTime.minutes;
    seconds.textContent = convertTime.seconds;
    if (restTime <= 0) {
      clearInterval(intervalId);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';

      iziToast.success({
        title: 'Success',
        message: 'Time is up!',
        position: 'topRight',
      });
    }
  }, 1000);
}
