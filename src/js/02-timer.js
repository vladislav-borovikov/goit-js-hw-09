import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
    startButon: document.querySelector('button[data-start]'),
    dataInput: document.querySelector('#datetime-picker'),
    dayEl: document.querySelector('.value[data-days]'),
    hoursEl: document.querySelector('.value[data-hours]'),
    minutesEl: document.querySelector('.value[data-minutes]'),
    secondsEl: document.querySelector('.value[data-seconds]')
}
const {
    startButon,
    dataInput,
    dayEl,
    hoursEl,
    minutesEl,
    secondsEl,
} = refs;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose
};

flatpickr('#datetime-picker', options);

let selectedDate = null;
let countdown = null;

startButon.disabled = true;

function onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        window.alert("Please choose a date in the future")
    } else {
        startButon.disabled = false;
        selectedDate = selectedDates[0];
    }
}

startButon.addEventListener('click', startCountdown);

function startCountdown() {
    startButon.disabled = true;
    dataInput.disabled = true

    countdown = setInterval(timeCounter, 1000);

}

function timeCounter() {
    let timeForEnd = selectedDate - Date.now();

    updateCounter(timeForEnd);
    CoountEnd(timeForEnd);
}

function updateCounter(timeForEnd) {
    dayEl.textContent = convertMs(timeForEnd).days;
    hoursEl.textContent = convertMs(timeForEnd).hours;
    minutesEl.textContent = convertMs(timeForEnd).minutes;
    secondsEl.textContent = convertMs(timeForEnd).seconds;
}

function CoountEnd(timeForEnd) {
    if (timeForEnd < 1000) {
        clearInterval(countdown);
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}