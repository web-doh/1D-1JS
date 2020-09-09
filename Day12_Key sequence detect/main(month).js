'use strict';
const explanation = document.querySelector('.explanation');
const hint = document.querySelector('.hint');

const pressed = [];
const monthText = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(new Date());
const secretCode = monthText.split('').reverse().join('');
const regex = new RegExp(secretCode, 'gi');

// hint styling
hint.style.color = `hsl(120, 100%, 50%)`;
hint.style.backgroundColor = `hsl(300, 100%, 50%)`;

// Function on key pressed(secret code)
function codeFound(e){
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
  console.log(pressed);
  if(pressed.join('').match(regex)){
      console.log('%c Ding Dong 🎉 ','background-color: hsl(300, 100%, 50%); color: hsl(120, 100%, 50%); font-size: 2rem; font-style: italic;');
      cornify_add();
    }
}

// Function on Hint 
function toggleText(){
  explanation.classList.add('hide');
  hint.classList.remove('hide');
  hint.innerHTML = 'won htnom'
}


explanation.addEventListener('click', toggleText);
window.addEventListener('keydown',codeFound);
