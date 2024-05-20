// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');   
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000 / 60);
        startStopBtn.textContent = 'Stop';
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapTimes = [];
    updateDisplay();
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(elapsedTime);
        displayLaps();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const milliseconds = String(time.getMilliseconds()).padStart(3, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function displayLaps() {
    laps.innerHTML = lapTimes.map((lapTime, index) => {
        const time = new Date(lapTime);
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        const milliseconds = String(time.getMilliseconds()).padStart(3, '0');
        return `<li>Lap ${index + 1}: ${minutes}:${seconds}:${milliseconds}</li>`;
    }).join('');
}
