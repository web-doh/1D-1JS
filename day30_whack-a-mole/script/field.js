'use strict';
import * as sound from './sound.js';
import { isStarted } from './game.js';

export const ItemType = Object.freeze({
    mole : 'mole'
})

export  class Field{
    constructor(){
        this.holes = document.querySelectorAll('.hole');
        this.field = document.querySelector('.game__field');
        this.field.addEventListener('click', this.onClick);
        this.lastHole = undefined;
        this.isStarted = false;
    }
    
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick = e => {
        if(e.isTrusted && e.target.matches('.mole')){ 
            sound.playCatchMole();
            this.onItemClick && this.onItemClick(ItemType.mole);  
        }
    };

    _randomIndex(){
        const holesNum = this.holes.length;
        const idx = Math.floor(Math.random()*holesNum);
        const hole = this.holes[idx];
        if (hole === this.lastHole) {
            return this._randomIndex();
        }
        this.lastHole = hole;
        return hole;
    }

    molePopUp(){
    const time = randomInterval(300,900);
    const hole = this._randomIndex();
    hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up');
        if(isStarted){
            this.molePopUp();
        }
        }, time)
    }
}


function randomInterval(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}
