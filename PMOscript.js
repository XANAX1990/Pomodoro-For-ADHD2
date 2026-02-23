let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let testTimer = document.getElementById("test-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")

let testBtn = document.getElementById("test-mode")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let resetBtn = document.getElementById("reset")
let timerMsg = document.getElementById("timer-message")
let button = document.querySelector(".button")

const ALARM_SOUND = "hassium.mp3";
const alarm = new Audio(ALARM_SOUND);
const volumeSlider = document.getElementById('volumeSlider');
const volumePercentage = document.getElementById('volumePercentage');

if (volumeSlider) {
    alarm.volume = volumeSlider.value;
    if (volumePercentage) volumePercentage.textContent = Math.round(volumeSlider.value * 100) + '%';
    volumeSlider.addEventListener('input', function () {
        alarm.volume = this.value;
        if (volumePercentage) volumePercentage.textContent = Math.round(this.value * 100) + '%';
    });
}

let currentTimer = null
let myInterval = null

function showDefaultTimer() {
    hideAll()
    pomodoro.style.display = "block"
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
    testBtn.classList.remove("active")

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
    testBtn.classList.remove("active")

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
    testBtn.classList.remove("active")
    currentTimer = long
    clearInterval(myInterval)
    resetTimer(currentTimer)
})

testBtn.addEventListener("click", () => {
    hideAll()

    testTimer.style.display = "block"
    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")
    testBtn.classList.add("active")
    currentTimer = testTimer

    clearInterval(myInterval)
    resetTimer(currentTimer)
})

function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let timeElement = timerDisplay.querySelector(".time");
    let durationAttr = timerDisplay.getAttribute("data-duration");

    let parts = durationAttr.split(":");
    let mins = parseFloat(parts[0]);
    let secs = parts.length > 1 ? parseFloat(parts[1]) : 0;

    let durationinmiliseconds = (mins * 60 * 1000) + (secs * 1000);
    let endTimestamp = Date.now() + durationinmiliseconds;

    myInterval = setInterval(function () {
        const timeRemaining = endTimestamp - Date.now();

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timeElement.textContent = "00:00";

            alarm.currentTime = 0;
            alarm.play().catch(e => console.log("Audio Error:", e));

        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);

            const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            timeElement.textContent = formattedTime;
        }
    }, 1000);
}

function resetTimer(timerDisplay) {
    clearInterval(myInterval);
    myInterval = null;

    let durationAttr = timerDisplay.getAttribute("data-duration");
    let parts = durationAttr.split(":");
    let mins = parseInt(parts[0]);
    let secs = parts.length > 1 ? parseInt(parts[1]) : 0;

    let timeElement = timerDisplay.querySelector(".time");

    if (timeElement) {
        timeElement.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
}

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.visibility = "hidden"
    } else {
        timerMsg.style.visibility = "visible"
    }
})

stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
        alarm.pause();
        alarm.currentTime = 0;
    }
})

resetBtn.addEventListener("click", () => {
    if (currentTimer) {
        resetTimer(currentTimer)
        alarm.pause();
        alarm.currentTime = 0;
    }

})
