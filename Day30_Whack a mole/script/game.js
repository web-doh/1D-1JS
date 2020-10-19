'use strict';
import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    excellent : 'excellent',
    good : 'good',
    soso: 'soso',
    bad : 'bad',
    cancel : 'cancel'
});


export default class Game {
    constructor(playTime) {
        this.playBtn = document.querySelector(".play__btn");
        this.scoreBoard = document.querySelector(".play__score");
        this.playTimer = document.querySelector(".play__timer");

        this.timer = undefined;
        this.isStarted = false;
        this.score = 0;
        this.playTime = playTime;
        
        this.playBtn.addEventListener('click',() => {
            if(!this.isStarted){
                this.start();
            }else{
                this.stop();
            }
        });

        this.gameField = new Field();
        this.gameField.setClickListener(this.onItemClick);

    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    };

    

    onItemClick = item => {
        if(item === 'mole'){
            this.score ++;
            this.displayScore();
        }
    }

    start(){
        this.init();
        this.isStarted = true;
        sound.playBgm();
        this.showStopBtn();
        this.startTimer();
        this.gameField.molePopUp();
    }; 
    
    stop(){
        this.isStarted = false;
        this.stopTimer(this.timer);
        this.hideStopBtn();
        sound.stopBgm();
        sound.playAlert();
        this.onGameStop && this.onGameStop('cancel');
    }
 
    init(){
        this.score = 0;
        this.displayScore();
        this.showPlayBtn();
        this.displayTimer(0);
    }

    finish(){
        this.isStarted = false;
        sound.stopBgm();
        this.stopTimer(this.timer);
        if(this.score >= 0 && this.score < 4){
            this.onGameStop && this.onGameStop('bad');
            sound.playBad();
        }else if(this.score >=4 && this.score < 7){
            this.onGameStop && this.onGameStop('soso');
            sound.playBad();
        }else if(this.score >=7 && this.score < 10){
            this.onGameStop && this.onGameStop('good');
            sound.playGood();
        }else{
            this.onGameStop && this.onGameStop('excellent');
            sound.playGood();
        }
    }
    
    
   // Score function
    displayScore(){
    this.scoreBoard.textContent = this.score;
}

// game handler function
    showStopBtn(){
    this.playBtn.style.visibility = 'visible';
    const icon = this.playBtn.querySelector('.fas');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
}

    hideStopBtn(){
    this.playBtn.style.visibility = 'hidden';
}

    showPlayBtn(){
    this.playBtn.style.visibility = 'visible';
    const icon = this.playBtn.querySelector('.fas');
    icon.classList.remove('fa-stop');
    icon.classList.add('fa-play');
}

    displayTimer(time){
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    this.playTimer.textContent = `${mins}:${secs}`;
}

// timer function
    startTimer(){
    let remainingSecs = this.playTime;
    this.displayTimer(remainingSecs);
    this.timer = setInterval(()=>{
        remainingSecs--;
        if(remainingSecs < 0){
            this.finish();
            clearInterval(this.timer);
            return;
        }
        this.displayTimer(remainingSecs);
    },1000);
}

    stopTimer(timerName){
    clearInterval(timerName);
}


}