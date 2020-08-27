'use strict';
function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
  
    audio.currentTime = 0;
    audio.play();
    addTransition(e);
    }
    
  function addTransition(e){
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!key) return;
    key.classList.add('playing');
  }

  function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  // const keys = document.querySelectorAll('.key');
  // keys.forEach(key => key.addEventListener('transitionend', removeTransition));
 
  const key = document.querySelector('.keys');
  key.addEventListener('transitionend', event => {
    if(event.target.className == 'key playing')
    removeTransition(event);
  });
 
  window.addEventListener('keydown',playSound);
