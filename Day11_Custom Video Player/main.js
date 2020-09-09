// variables
const video = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playBtn = document.querySelector('.play__btn');
const skipBtn = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type=range]');
const volBtn = document.querySelector('.fas');
const playTime = document.querySelector('#description__time');

// function : video play & pause
function togglePlay(){
    video.paused? video.play() : video.pause();
    updatePlayBtn();
}

function updatePlayBtn(){
    const playIcon = video.paused? '►' : '❚❚';
    playBtn.textContent = playIcon;
}

function updateProgressBar(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + '%';
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function skip(){
    video.currentTime += this.dataset.skip * 1;
}

// function : volume && play back rate
function mutedControl(){
    video.muted = !video.muted;
    updateVolBtn();
}

function updateVolBtn(){
    const volIcon = video.muted? 'fas fa-volume-mute' : 'fas fa-volume-up';
    volBtn.className = volIcon;
}

function updateRange(){
    video[this.name] = this.value;
    if(this.name === 'playbackRate'){
      this.nextElementSibling.textContent = `${this.value}x`;
    }else{
        video.muted = false;
        updateVolBtn();
    }
}

function displayPlayTime(){
    const hour = parseInt(video.duration / 3600);
    const min = parseInt(video.duration % 3600 / 60);
    const sec = parseInt(video.duration % 3600 % 60);

    playTime.textContent = `${hour}h ${min}m ${sec}s`;
}

// event handlers

playBtn.addEventListener('click',togglePlay);

volBtn.addEventListener('click',mutedControl);
ranges.forEach(range => range.addEventListener('change',updateRange));
ranges.forEach(range => range.addEventListener('mousedown',updateRange));
skipBtn.forEach(btn => btn.addEventListener('click',skip));

video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',updateProgressBar);
video.addEventListener('play',displayPlayTime);

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',()=> mousedown = false);

