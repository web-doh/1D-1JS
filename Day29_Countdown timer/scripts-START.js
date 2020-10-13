let countdown;
let isStop = false;
let remainTime;
const timerBtn = document.querySelector('.timer__controls');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const stopBtn = document.querySelector('.stop__button');
const customTime = document.querySelector('#custom');

const alarm = new Audio('sound/alarm.mp3');

function startTimer(e){
    const target = e.target;
    if(target.nodeName == 'BUTTON') {
        const sec = parseInt(target.dataset.time);
        timer(sec);
        isStop = false;
    }
}

function timer(sec) {
    alarmReset();
    clearInterval(countdown);
    
    const start = Date.now();
    const then = start + sec * 1000;
    displayTimeLeft(sec);
    displayEndTime(then);

    startInterval(then);
}

function startInterval(then){
    countdown = setInterval(()=>{
        let remainingTime =  Math.round((then - Date.now())/1000);
        if(remainingTime < 0){
            clearInterval(countdown);
            playAlarm();
            return;
        }
        displayTimeLeft(remainingTime);
    }, 1000);
}

function stopTimer(){
    isStop = !isStop;
    stopBtn.textContent = isStop? 'RESTART' : 'STOP';
    if(isStop){
        clearInterval(countdown);
    }else{
        const timertime = timeLeft.textContent;
        const secs = timertime.slice(-2) * 1;
        const minsToSecs = timertime.slice(0, -3) * 60;
        const then = Date.now() + (minsToSecs + secs) * 1000;
        displayEndTime(then);
        startInterval(then);
    }
}

function displayTimeLeft(sec){
    const min = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    const display = `${min}:${remainingSec < 10? '0':''}${remainingSec}`;
    document.title = display;
    timeLeft.textContent = display;
}

function displayEndTime(timestamp){
    const then = new Date(timestamp);
    const hours = then.getHours();
    const mins = then.getMinutes();

    endTime.textContent = `Be Back at ${hours > 12? hours - 12 : hours}:${mins < 10? '0' + mins : mins}`
}

function timeSetting(e){
    e.preventDefault();
    const sec = this.minutes.value * 60;
    timer(sec);
    this.reset();
}

function playAlarm(){
    alarm.play();
}

function alarmReset(){
    alarm.pause();
    alarm.currentTime = 0;
}

timerBtn.addEventListener('click', startTimer);
customTime.addEventListener('submit', timeSetting);
stopBtn.addEventListener('click',stopTimer);
