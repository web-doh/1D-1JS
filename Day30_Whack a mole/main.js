'use stricts';
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const playBtn = document.querySelector('.play__btn');
const scoreBoard = document.querySelector('.play__score');
const playTimer = document.querySelector('.play__timer');

const popUp = document.querySelector('#pop-up');
const popUpText = document.querySelector('.pop-up__context');
const replayBtn = document.querySelector('.pop-up__replay-btn');

const PLAY_TIME = 10;

let timer;
let isStarted = false;

// play game function
function playGame(){
    isStarted = true;
    hidePopup();
    showStopBtn();
    startTimer();
}; 

function stopGame(){
    isStarted = false;
    stopTimer();
    hideStopBtn();
    showPopup();
}

function initGame(){
    isStarted = false;
    showPlayBtn();
    hidePopup();
    displayTimer(0);
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
            clearInterval(timer);
            return;
        }
        displayTimer(remainingSecs);
    },1000);
}

function stopTimer(){
    clearInterval(timer);
}

// pop-up function
function showPopup(){
    popUp.classList.remove('pop-up__hide');
}

function hidePopup(){
    popUp.classList.add('pop-up__hide');
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