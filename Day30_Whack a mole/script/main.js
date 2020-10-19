'use strict';
import PopUp from './popup.js';
import Game from './game.js'

const PLAY_TIME = 8;

const game = new Game(PLAY_TIME);
const gameBanner = new PopUp();
gameBanner.setClickListener(game.init());
game.setGameStopListener(reason => {
    let message;
    console.log(reason);
})


