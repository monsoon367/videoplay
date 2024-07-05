const videoPlayer = document.querySelectorAll('.videoPlayer')
videoPlayer.forEach(videoPlayer => {
    const videoPlayer_html=`${videoPlayer.innerHTML}

`;

    videoPlayer.innerHTML=videoPlayer_html;

const memes=document.querySelector('#memes');
//sellect all require tags
const mainVideo=videoPlayer.querySelector('#mainVideo'),
progressContainer=videoPlayer.querySelector('.progressContainer'),
rangeProgress=videoPlayer.querySelector('#rangeProgress'),
progressShadow=videoPlayer.querySelector('.progressShadow'),
progressBuffer=videoPlayer.querySelector('.progressBuffer'),
blockRewind=videoPlayer.querySelector('.blockRewind'),
blockCenter=videoPlayer.querySelector('.blockCenter'),
blockForward=videoPlayer.querySelector('.blockForward'),
fastRewind=videoPlayer.querySelector('#fastRewind'),
playPauseMobile=videoPlayer.querySelector('#playPauseMobile'),
playPauseMobileIcon=videoPlayer.querySelector('#playPauseMobileIcon'),
playPause=videoPlayer.querySelector('#playPause'),
playPauseIcon=videoPlayer.querySelector('#playPauseIcon'),
fastForward=videoPlayer.querySelector('#fastForward'),
volumeBtn=videoPlayer.querySelector('#volumeBtn'),
volumeBtnIcon=videoPlayer.querySelector('#volumeBtnIcon'),
volumeRange=videoPlayer.querySelector('#volumeRange'),
durationMobile=videoPlayer.querySelector('.durationMobile'),
currentMobile=videoPlayer.querySelector('.currentMobile'),
duration=videoPlayer.querySelector('.duration'),
current=videoPlayer.querySelector('.current'),
pictureInPicture=videoPlayer.querySelector('#pictureInPicture'),
fullscreen=videoPlayer.querySelector('#fullscreen'),
fullscreenIcon=videoPlayer.querySelector('#fullscreenIcon'),
twoTimeSpeedNotif=videoPlayer.querySelector('.twoTimeSpeedNotif'),
rewindNotif=videoPlayer.querySelector('.rewindNotif'),
arrowLOne=videoPlayer.querySelector('.arrowLOne'),
arrowLTwo=videoPlayer.querySelector('.arrowLTwo'),
arrowLThree=videoPlayer.querySelector('.arrowLThree'),
rewindTime=videoPlayer.querySelector('.arrowLThree'),
forwardNotif=videoPlayer.querySelector('.forwardNotif'),
arrowROne=videoPlayer.querySelector('.arrowROne'),
arrowRTwo=videoPlayer.querySelector('.arrowRTwo'),
arrowRThree=videoPlayer.querySelector('.arrowRThree');



document.addEventListener("keydown", e => {
    const tagName = document.activeElement.tagName.toLowerCase()
  
    if (tagName === "input") return
  
    switch (e.key.toLowerCase()) {
      case " ":
        if (tagName === "button") return
      case "k":
        togglePlay()
        break
      case "f":
        toggleFullscreen()
        break
      case "t":
        toggleTheaterMode()
        break
      case "i":
        toggleMiniPlayerMode()
        break
      case "m":
        toggleMute()
        break
      case "arrowleft":
      case "j":
        skip(-5)
        break
      case "arrowright":
      case "l":
        skip(5)
        break
      case "c":
        toggleCaptions()
        break
    }
  })

  function keyPress (e) {
    if(e.key === "Escape") {
        toggleFullscreen
    }
}



mainVideo.addEventListener("play",()=>{
    videoPlayer.classList.remove('paused')
    playPauseIcon.src = "./assets/icons/Pause-icon.svg";
    playPauseMobileIcon.src = "./assets/icons/Pause-icon.svg";
    playPauseIcon.title = "Pause"
});
mainVideo.addEventListener("pause",()=>{
    videoPlayer.classList.add('paused')
    playPauseIcon.src = "./assets/icons/Play-icon.svg";
    playPauseMobileIcon.src = "./assets/icons/Play-icon.svg";
    playPauseIcon.title = "Play"
});
mainVideo.addEventListener('ended' ,myHandler,false);
    function myHandler(){
        playPauseIcon.src = "./assets/icons/Replay-icon.svg";
        playPauseMobileIcon.src = "./assets/icons/Replay-icon.svg";
    };
function togglePlay(){
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
};

playPause.addEventListener('click', togglePlay);
playPauseMobile.addEventListener('click', togglePlay);

//two time speed event
let eventTimerId;
function toggleTwoTimeSpeed() {
    eventTimerId = setTimeout(function () {
		mainVideo.playbackRate = 2.0;
    twoTimeSpeedNotif.style.opacity="1";
	}, 700);
};
function toggleEndTwoTimeSpeed() {
    clearTimeout(eventTimerId);
    mainVideo.playbackRate = 1.0;
    twoTimeSpeedNotif.style.opacity="0";
};
mainVideo.addEventListener('mousedown', toggleTwoTimeSpeed);
mainVideo.addEventListener('mouseup', toggleEndTwoTimeSpeed);
blockRewind.addEventListener('touchstart', toggleTwoTimeSpeed);
blockRewind.addEventListener('touchend', toggleEndTwoTimeSpeed);
blockCenter.addEventListener('touchstart', toggleTwoTimeSpeed);
blockCenter.addEventListener('touchend', toggleEndTwoTimeSpeed);
blockForward.addEventListener('touchstart', toggleTwoTimeSpeed);
blockForward.addEventListener('touchend', toggleEndTwoTimeSpeed);



//Rewind Forward
function toggleRewind(){
    mainVideo.currentTime -= 10;
};
function toggleForward(){
    mainVideo.currentTime += 10;
};
blockRewind.addEventListener('dblclick', toggleRewind);
blockForward.addEventListener('dblclick', toggleForward);
fastRewind.addEventListener('click', toggleRewind);
fastForward.addEventListener('click', toggleForward);


mainVideo.addEventListener('timeupdate', function() {
    const proggres = (mainVideo.currentTime / mainVideo.duration) * 100;
    rangeProgress.value = proggres;
    progressShadow.style.width = proggres + "%";
});
rangeProgress.addEventListener('input', function(){
    const time = (rangeProgress.value / 100) * mainVideo.duration;
    mainVideo.currentTime = time;
});
rangeProgress.oninput = function(){
    progressShadow.style.width = rangeProgress.value + "%";
}
function drawProgress(canvas, buffered, duration) {
    let context = canvas.getContext('2d', { antialias: false });
    context.fillStyle = "#e4e4e4";
    let height = canvas.height;
    let width = canvas.width;
    if (!height || !width) throw "Canva's width or height or not set.";
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < buffered.length; i++) {
      let leadingEdge = buffered.start(i) / duration * width;
      let trailingEdge = buffered.end(i) / duration * width;
      context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height)
    }
  }
mainVideo.addEventListener('progress', () => {
    drawProgress(progressBuffer, mainVideo.buffered, mainVideo.duration);
  })



//duration function
mainVideo.addEventListener('loadedmetadata',() => { 
    duration.textContent = formatDuration(mainVideo.duration);
    durationMobile.textContent = formatDuration(mainVideo.duration);
});
mainVideo.addEventListener('timeupdate',() => { 
    current.textContent = formatDuration(mainVideo.currentTime);
    currentMobile.textContent = formatDuration(mainVideo.currentTime);
});

const leadingZeroFormater = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})
function formatDuration(time){
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)%60
    const hour = Math.floor(time / 3600)
    if(hour === 0){
        return `${minutes}:${leadingZeroFormater.format(seconds)}`
    } else {
        return `${hour}:${leadingZeroFormater.format(minutes)}:${leadingZeroFormater.format(seconds)}`
    }
}


// Volume
const toggleMute = () => {
    mainVideo.muted = !mainVideo.muted;
    if (mainVideo.muted) {
        volumeRange.value = '0';
        volumeBtnIcon.src = "./assets/icons/Volume-off-icon.svg";
        volumeRange.style.opacity = "0";
        setTimeout(function(){
            volumeRange.style.display = "none";
        }, 200);
        volumeBtnIcon.title = "Unmute"
    } else {
        volumeRange.value = mainVideo.volume * 100;
        volumeBtnIcon.src = "./assets/icons/Volume-up-icon.svg";
        volumeRange.style.display = "inline-block";
        volumeBtnIcon.title = "Mute"
        setTimeout(function(){
            volumeRange.style.opacity = "1";
        }, 50);   
    }
};
volumeBtn.addEventListener('click', toggleMute);

volumeRange.addEventListener('input',() => {
    mainVideo.volume = volumeRange.value / 100;
    if (volumeRange.value == 0) {
        volumeBtnIcon.src = "./assets/icons/Volume-off-icon.svg";
    } else if (volumeRange.value < 40){
        volumeBtnIcon.src = "./assets/icons/Volume-up-icon.svg";
    } else {
        volumeBtnIcon.src = "./assets/icons/Volume-up-icon.svg";
    }
});
   
//pictureInPicture
pictureInPicture.addEventListener('click',()=>{
    mainVideo.requestPictureInPicture();
});



function esckey(evt) {
    if (evt.keyCode == 27) {
       alert("memes")
    }
 }

//Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen();
        screen.orientation.lock("landscape-primary");
      }else{
        document.exitFullscreen();
        screen.orientation.unlock();
      }
}
fullscreen.addEventListener('click', toggleFullscreen);
mainVideo.addEventListener("dblclick",  toggleFullscreen);

  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
      fullscreenIcon.title = "Enter Fullscreen"
    } else {
      fullscreenIcon.src = "./assets/icons/Fullscreen-Exit-icon.svg"
      fullscreenIcon.title = "Exit Fullscreen"
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
    }
});


});//end



