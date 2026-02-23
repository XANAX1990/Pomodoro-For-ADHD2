let timer;
let hours = 0, minutes = 0, seconds = 0;

document.getElementById('startButton').addEventListener('click', function () {
    hours = parseInt(document.getElementById('hoursInput').value) || 0;
    minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    seconds = parseInt(document.getElementById('secondsInput').value) || 0;

    startTimer();
});

document.getElementById('pauseButton').addEventListener('click', function () {
    clearInterval(timer);
});

document.getElementById('resumeButton').addEventListener('click', function () {
    startTimer();
    isPaused = false; // หมายเหตุ: ในรูปต้นฉบับมีตัวแปร isPaused โผล่มาแต่ไม่ได้ประกาศไว้ตอนต้น
    document.getElementById('pauseButton').style.display = 'inline-block';
    document.getElementById('resumeButton').style.display = 'none';
});

document.getElementById('resetButton').addEventListener('click', function () {
    clearInterval(timer);
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
});

function startTimer() {
    timer = setInterval(function () {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) {
                    clearInterval(timer);
                    try {
                        audio.play();
                    } catch (e) {
                        console.error('Audio play failed', e);
                    }
                    return;
                }
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }

        document.getElementById('display').textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}


const audio = new Audio('hassium.mp3');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercentage = document.getElementById('volumePercentage');

// Setup Volume Control
if (volumeSlider) {
    audio.volume = volumeSlider.value;
    if (volumePercentage) volumePercentage.textContent = Math.round(volumeSlider.value * 100) + '%';
    volumeSlider.addEventListener('input', function () {
        audio.volume = this.value;
        if (volumePercentage) volumePercentage.textContent = Math.round(this.value * 100) + '%';
    });
}

function enforceConstraint(input, max) {
    input.addEventListener('input', function () {
        let val = parseInt(this.value);
        if (isNaN(val) || val < 0) {
            this.value = '';
        } else if (val > max) {
            this.value = max;
        }
    });
}

enforceConstraint(hoursInput, 23);
enforceConstraint(minutesInput, 59);
enforceConstraint(secondsInput, 59);

