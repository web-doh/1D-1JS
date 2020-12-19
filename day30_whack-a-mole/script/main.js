'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js'
import * as sound from './sound.js';

const PLAY_TIME = 8;

const game = new GameBuilder()
            .withGameDuration(PLAY_TIME)
            .build();

const gameBanner = new PopUp();
gameBanner.setClickListener(() => {game.init()});
game.setGameStopListener(reason => {
    let message;
    switch(reason){
        case Reason.excellent :
            message = 'Excellent :)';
            sound.playGood();
            break;
        case Reason.good :
            message = 'Good Job!';
            sound.playGood();
            break;
        case Reason.soso:
            message = 'Soso ..';
            sound.playBad();
            break;
        case Reason.bad:
            message = 'Bad ;(';
            sound.playBad();
            break;
        case Reason.cancel:
            message = 'Retry?';
            sound.playAlert();
            break;
        default:
            throw new Error('not valid reason');
            break;
    }
    gameBanner.show(message);
})


