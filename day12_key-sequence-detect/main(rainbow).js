'use strict';
const explanation = document.querySelector('.explanation');
const hint = document.querySelector('.hint');

const pressed = [];
const secretCode = 'rainbow';
const regex = new RegExp(secretCode, 'gi');

// hint initial-styling
hint.style.color = `hsl(180, 100%, 50%)`;
hint.style.backgroundColor = `hsl(0, 100%, 50%)`;

// Function on key pressed(secret code)
function codeFound(e){
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
  console.log(pressed);
  if(pressed.join('').match(regex)){
      console.log('%c Ding Dong 🌈 ','background-color: cyan; color: red; font-size: 2rem; font-style: italic;');
      cornify_add();
    }
}

// Function on Hint 
let hue = 0;

function toggleText(){
  explanation.classList.add('hide');
  hint.classList.remove('hide');
}

function rainbowColor(){
  hint.style.color = `hsl(${hue + 180}, 100%, 50%)`;
  hint.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
  hue = hue + 30;
  stopClickHint();
}

function stopClickHint(){
  if(hue === 360){
    hint.innerHTML = 'what did you see?'
  }else if(hue > 360){
    hint.classList.add('hide');
    explanation.classList.remove('hide');
    hue = 0;
    hint.innerHTML = 'click again!'
  }
}

explanation.addEventListener('click', toggleText);
hint.addEventListener('click', rainbowColor);
window.addEventListener('keydown',codeFound);
