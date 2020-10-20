'use strict';

export default class PopUp {
    constructor(){
        this.popUp = document.querySelector('#pop-up');
        this.popUpText = document.querySelector('.pop-up__context');
        this.replayBtn = document.querySelector('.pop-up__replay-btn');
        this.replayBtn.addEventListener('click',() => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    show(msg){
        this.popUp.classList.remove('pop-up__hide');
        this.popUpText.textContent = msg;
    }
    
    hide(){
        this.popUp.classList.add('pop-up__hide');
    }
}