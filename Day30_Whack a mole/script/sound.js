const bgm = new Audio('./sound/bg.mp3');
const badSound = new Audio('./sound/bad.mp3');
const goodSound = new Audio('./sound/good.mp3');
const alertSound = new Audio('./sound/alert.wav');
const catchMoleSound = new Audio('./sound/catch_mole.mp3');

export function playBgm(){
    playSound(bgm);
}

export function stopBgm(){
    stopSound(bgm);
}

export function playBad(){
    playSound(badSound);
}

export function playGood(){
    playSound(goodSound);
}

export function playAlert(){
    playSound(alertSound);
}

export function playCatchMole(){
    playSound(catchMoleSound);
}


function playSound(audio){
    audio.currentTime = 0;
    audio.play();
}

function stopSound(audio){
    audio.pause();
}