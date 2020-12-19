'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export let isStarted = false;
export const Reason = Object.freeze({
    excellent : 'excellent',
    good : 'good',
    soso: 'soso',
    bad : 'bad',
    cancel : 'cancel'
});

export class GameBuilder{
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    build(){
        return new Game(this.gameDuration);
    }
}

class Game {
    constructor(gameDuration) {
        this.gameDuration = gameDuration;

        this.timer = undefined;
        this.score = 0;

        this.scoreBoard = document.querySelector(".play__score");
        this.playTimer = document.querySelector(".play__timer");
        this.playBtn = document.querySelector(".play__btn");

        this.playBtn.addEventListener('click',() => {
            if(!isStarted){
                this.start();
            }else{
                this.stop(Reason.cancel);
            }
        });

        this.gameField = new Field();
        this.gameField.setClickListener(this.onItemClick);
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    };

    

    onItemClick = item => {
        if(item === ItemType.mole){
            this.score ++;
            this.displayScore();
        }
    }

    start(){
        this.init();
        isStarted = true;
        sound.playBgm();
        this.showStopBtn();
        this.startTimer();
        this.gameField.molePopUp();
    }; 
    
    stop(reason){
        isStarted = false;
        sound.stopBgm();
        this.stopTimer(this.timer);
        this.hideStopBtn();
        this.onGameStop && this.onGameStop(reason);
    }

    init(){
        this.score = 0;
        this.displayScore();
        this.showPlayBtn();
        this.displayTimer(0);
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
    let remainingSecs = this.gameDuration;
    this.displayTimer(remainingSecs);
    this.timer = setInterval(()=>{
        if(remainingSecs <= 0){
            clearInterval(this.timer);
            if(this.score >= 0 && this.score < 4){
                this.stop(Reason.bad);
            }else if(this.score >=4 && this.score < 7){
                this.stop(Reason.soso);
            }else if(this.score >=7 && this.score < 10){
                this.stop(Reason.good);
            }else{
                this.stop(Reason.excellent);
            }
            return;
        }
        this.displayTimer(--remainingSecs);
    },1000);
}

    stopTimer(timerName){
        clearInterval(timerName);
}
}