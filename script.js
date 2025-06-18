let timeLeft = 25 * 60; // 25 minutes en secondes
let timerId = null;
let isRunning = false;
let isBreak = false;

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Ajout de la logique pour le dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');

const modeSwitchBtn = document.getElementById('modeSwitchBtn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = timeString;
    document.title = `${timeString} - Pomodoro Timer`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = 'Démarrer';
        isRunning = false;
    } else {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                isBreak = !isBreak;
                timeLeft = isBreak ? parseInt(breakTimeInput.value) * 60 : parseInt(workTimeInput.value) * 60;
                modeDisplay.textContent = isBreak ? 'Pause' : 'Temps de travail';
                modeDisplay.className = isBreak ? 'mode break' : 'mode work';
                updateDisplay();
                isRunning = false;
                startBtn.textContent = 'Démarrer';
            }
        }, 1000);
        startBtn.textContent = 'Pause';
        isRunning = true;
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    isBreak = false;
    timeLeft = parseInt(workTimeInput.value) * 60;
    modeDisplay.textContent = 'Temps de travail';
    modeDisplay.className = 'mode work';
    startBtn.textContent = 'Démarrer';
    updateDisplay();
}

startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Ajout de la logique pour le dark mode
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

workTimeInput.addEventListener('change', () => {
    if (!isRunning) {
        timeLeft = parseInt(workTimeInput.value) * 60;
        updateDisplay();
    }
});

breakTimeInput.addEventListener('change', () => {
    if (!isRunning) {
        timeLeft = parseInt(breakTimeInput.value) * 60;
        updateDisplay();
    }
});

modeSwitchBtn.addEventListener('click', () => {
    isBreak = !isBreak;
    timeLeft = isBreak ? parseInt(breakTimeInput.value) * 60 : parseInt(workTimeInput.value) * 60;
    modeDisplay.textContent = isBreak ? 'Pause' : 'Temps de travail';
    modeDisplay.className = isBreak ? 'mode break' : 'mode work';
    modeSwitchBtn.textContent = isBreak ? 'Mode Travail' : 'Mode Pause';
    updateDisplay();
});

updateDisplay(); 