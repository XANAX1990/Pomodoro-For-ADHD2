let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let resetBtn = document.getElementById("reset")
let timerMsg = document.getElementById("timer-message")
let button = document.querySelector(".button")

const ALARM_SOUND = "hassium.mp3";

let currentTimer = null
let myInterval = null

function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
    currentTimer = pomodoro
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => (
        timer.style.display = "none"
    ))
}

session.addEventListener("click", () => {
    hideAll()

    pomodoro.style.display = "block"

    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro
    clearInterval(myInterval)
    resetTimer(currentTimer)
})

shortBreak.addEventListener("click", () => {
    hideAll()

    short.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short
    clearInterval(myInterval)
    resetTimer(currentTimer)
})

longBreak.addEventListener("click", () => {
    hideAll()

    long.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")
    currentTimer = long
    clearInterval(myInterval)
    resetTimer(currentTimer)
})


function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let timeElement = timerDisplay.querySelector(".time");


    timerDuration = timerDisplay
        .getAttribute("data-duration")
        .split(":")[0];

    let durationinmiliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationinmiliseconds;


    let initialMinutes = parseInt(timerDuration);
    timeElement.textContent = initialMinutes.toString().padStart(2, "0") + ":00";

    myInterval = setInterval(function () {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timeElement.textContent = "00:00";
            const alarm = new Audio(ALARM_SOUND);
            alarm.volume = 0.5;
            alarm.play();
        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);

            let displayMinutes = minutes;
            let displaySeconds = seconds;

            if (seconds == 60) {
                displayMinutes = minutes + 1;
                displaySeconds = 0;
            }

            const formattedTime = `${displayMinutes.toString().padStart(2, "0")}:${displaySeconds
                .toString()
                .padStart(2, "0")}`;

            timeElement.textContent = formattedTime;
        }
    }, 1000);
}

function resetTimer(timerDisplay) {
    clearInterval(myInterval);
    myInterval = null;

    let timerDuration = timerDisplay
        .getAttribute("data-duration")
        .split(":")[0];

    let initialMinutes = parseInt(timerDuration);

    let timeElement = timerDisplay.querySelector(".time");

    if (timeElement) {
        timeElement.textContent = initialMinutes.toString().padStart(2, "0") + ":00";
    }
}

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.display = "none"
    } else {
        timerMsg.style.display = "block"
    }
})

stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
    }
})

resetBtn.addEventListener("click", () => {
    if (currentTimer) {
        resetTimer(currentTimer)
    }
})