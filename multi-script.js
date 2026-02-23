let countdown;
const display = document.getElementById('display');
const audio = new Audio('hassium.mp3');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercentage = document.getElementById('volumePercentage');

if (volumeSlider) {
    audio.volume = volumeSlider.value;
    if (volumePercentage) volumePercentage.textContent = Math.round(volumeSlider.value * 100) + '%';
    volumeSlider.addEventListener('input', function () {
        audio.volume = this.value;
        if (volumePercentage) volumePercentage.textContent = Math.round(this.value * 100) + '%';
    });
}

function startTimer(seconds) {
    clearInterval(countdown);
    audio.pause();
    audio.currentTime = 0;

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            audio.play();
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displayStr = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    display.textContent = displayStr;
    document.title = displayStr + " - Countdown";
}

function resetTimer() {
    clearInterval(countdown);
    audio.pause();
    audio.currentTime = 0;
    display.textContent = "0:00";
    document.title = "Future CountDown";
}
