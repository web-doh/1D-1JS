'use stricts';
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const playBtn = document.querySelector('.play__btn');
const scoreBoard = document.querySelector('.play__score');
const playTimer = document.querySelector('.play__timer');

const popUp = document.querySelector('#pop-up');
const popUpText = document.querySelector('.pop-up__context');
const replayBtn = document.querySelector('.pop-up__replay-btn');

const PLAY_TIME = 8;

let timer;
let lastHole;
let isStarted = false;
let score;

const bgm = new Audio('./sound/bg.mp3');
const badSound = new Audio('./sound/bad.mp3');
const goodSound = new Audio('./sound/good.mp3');
const catchMoleSound = new Audio('./sound/catch_mole.mp3');
const alertSound = new Audio('./sound/alert.wav');

// play game function
function playGame(){
    initGame();
    isStarted = true;
    playSound(bgm);
    hidePopup();
    showStopBtn();
    startTimer();
    molePopUp();
}; 

function stopGame(){
    isStarted = false;
    stopTimer(timer);
    hideStopBtn();
    stopSound(bgm);
    playSound(alertSound);
    showPopup('RETRY?');
}

function finishGame(){
    isStarted = false;
    stopSound(bgm);
    stopTimer(timer);
    if(score >= 0 && score < 4){
        showPopup('BAD!');
        playSound(badSound);
    }else if(score >=4 && score < 7){
        showPopup('SOSO!');
        playSound(badSound);
    }else if(score >=7 && score < 10){
        showPopup('GOOD JOB!');
        playSound(goodSound);
    }else{
        showPopup('EXELLENT!');
        playSound(goodSound);
    }
}

function initGame(){
    score = 0;
    displayScore();
    showPlayBtn();
    hidePopup();
    displayTimer(0);
}

// game field setting function
function randomIndex(){
    const holesNum = holes.length;
    const idx = Math.floor(Math.random()*holesNum);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomIndex();
    }
    lastHole = hole;
    return hole;
}

function randomInterval(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}

function molePopUp(){
    const time = randomInterval(200,900);
    const hole = randomIndex();
    hole.classList.add('up');
    setTimeout(()=>{
    hole.classList.remove('up');
    if(isStarted){
        molePopUp();
    }
    }, time)
}

// Score function
function displayScore(){
    scoreBoard.textContent = score;
}
function updateScore(){
    score ++;
    playSound(catchMoleSound);
    displayScore();
    return score;
}

// game handler function
function showStopBtn(){
    playBtn.style.visibility = 'visible';
    const icon = playBtn.querySelector('.fas');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
}

function hideStopBtn(){
    playBtn.style.visibility = 'hidden';
}

function showPlayBtn(){
    playBtn.style.visibility = 'visible';
    const icon = playBtn.querySelector('.fas');
    icon.classList.remove('fa-stop');
    icon.classList.add('fa-play');
}

function displayTimer(time){
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    playTimer.textContent = `${mins}:${secs}`;
}

// timer function
function startTimer(){
    let remainingSecs = PLAY_TIME;
    displayTimer(remainingSecs);
    timer = setInterval(()=>{
        remainingSecs--;
        if(remainingSecs < 0){
            finishGame();
            clearInterval(timer);
            return;
        }
        displayTimer(remainingSecs);
    },1000);
}

function stopTimer(timerName){
    clearInterval(timerName);
}

// pop-up function
function showPopup(msg){
    popUp.classList.remove('pop-up__hide');
    popUpText.textContent = msg;
}

function hidePopup(){
    popUp.classList.add('pop-up__hide');
}

// Sound function
function playSound(audio){
    audio.currentTime = 0;
    audio.play();
}

function stopSound(audio){
    audio.pause();
}


// Event Listener
playBtn.addEventListener('click',() => {
    if(!isStarted){
        playGame();
    }else{
        stopGame();
    }
});

replayBtn.addEventListener('click',initGame);
moles.forEach(mole => mole.addEventListener('click', updateScore));