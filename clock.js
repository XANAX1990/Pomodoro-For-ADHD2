let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let ampm = document.getElementById("ampm");

setInterval(() => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    let ampmText = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    hrs.innerHTML = (hours < 10 ? "0" : "") + hours;
    min.innerHTML = (minutes < 10 ? "0" : "") + minutes;
    sec.innerHTML = (seconds < 10 ? "0" : "") + seconds;
    ampm.innerHTML = ampmText;

}, 1000)



