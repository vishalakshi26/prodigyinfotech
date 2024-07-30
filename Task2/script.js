// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;
let lapList = [];

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00';
    lapCounter = 1;
    lapList = [];
    lapsContainer.innerHTML = '';
}

function addLap() {
    if (running) {
        const lapTime = formatTime(difference);
        lapList.push(`Lap ${lapCounter}: ${lapTime}`);
        lapCounter++;
        lapsContainer.innerHTML = lapList.map(lap => `<div class="lap-time">${lap}</div>`).join('');
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
