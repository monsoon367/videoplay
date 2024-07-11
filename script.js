const videoContainer=document.querySelector('.videoContainer');

const videoPlayer = document.querySelectorAll('.videoPlayer')
videoPlayer.forEach(videoPlayer => {
    const videoPlayer_html=`${videoPlayer.innerHTML}

`;

    videoPlayer.innerHTML=videoPlayer_html;


//sellect all require tags
const mainVideo=videoPlayer.querySelector('#mainVideo'),
mainVideoClickF=videoPlayer.querySelector('.mainVideoClickF'),

fullscreen=videoPlayer.querySelector('#fullscreen'),
fullscreenIcon=videoPlayer.querySelector('#fullscreenIcon'),

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

autoplay=videoPlayer.querySelector('.auto-play'),

setting=videoPlayer.querySelector('#setting'),
settingsContainer=videoPlayer.querySelector('.settingsContainer'),
mainSettings=videoPlayer.querySelector('.mainSettings'),

deafultQuality=videoPlayer.querySelector('#deafultQuality'),
qualityStatus=videoPlayer.querySelector('#qualityStatus'),
settingList=videoPlayer.querySelector('.settingList'),
qualityBtn=videoPlayer.querySelector('#qualityBtn'),
qualityList=videoPlayer.querySelector('.qualityList'),
qualityCloseBtn=videoPlayer.querySelector('#qualityCloseBtn'),

playbackStatus=videoPlayer.querySelector('#playbackStatus'),
customPlaybackStatus=videoPlayer.querySelector('#customPlaybackStatus'),
playbackList=videoPlayer.querySelector('.playbackList'),
playback=videoPlayer.querySelectorAll(".playbackBtnList li"),
playbackSpeedBtn=videoPlayer.querySelector('#playbackSpeedBtn'),
playbackCloseBtn=videoPlayer.querySelector('#playbackCloseBtn'),
customLinkRangePlayback=videoPlayer.querySelector('#customLinkRangePlayback'),
customRangePlayback=videoPlayer.querySelector('.customRangePlayback'),

pictureInPicture=videoPlayer.querySelector('#pictureInPicture'),
twoTimeSpeedNotif=videoPlayer.querySelector('.twoTimeSpeedNotif'),
playbackRangeCloseBtn=videoPlayer.querySelector('#playbackRangeCloseBtn'),
rangeCustomPlayback=videoPlayer.querySelector("#rangeCustomPlayback"),
customPlaybackNotif=videoPlayer.querySelector("#customPlaybackNotif"),
PlaybackRangeValue=videoPlayer.querySelector("#PlaybackRangeValue"),
rewindNotif=videoPlayer.querySelector('.rewindNotif'),
arrowLOne=videoPlayer.querySelector('.arrowLOne'),
arrowLTwo=videoPlayer.querySelector('.arrowLTwo'),
arrowLThree=videoPlayer.querySelector('.arrowLThree'),
rewindTime=videoPlayer.querySelector('.arrowLThree'),
forwardNotif=videoPlayer.querySelector('.forwardNotif'),
arrowROne=videoPlayer.querySelector('.arrowROne'),
arrowRTwo=videoPlayer.querySelector('.arrowRTwo'),
arrowRThree=videoPlayer.querySelector('.arrowRThree'),
quality_ul = videoPlayer.querySelector(".settingsContainer [data-label='qualityList'] ul"),
qualitys = videoPlayer.querySelectorAll("source[size]");

document.addEventListener('keydown',(event) => {
    const {activeElement} = document
    const hasButtonRole = activeElement?.getAttribute('role') === 'button'
    if (hasButtonRole) {
        if (['Spacebar', ' ', 'Enter'].includes(event.key)) {
            event.preventDefault()
        }
        if (event.key === 'Enter') {
            activeElement.click()
        }
    }
})
document.addEventListener('keyup',(event) => {
    const {activeElement} = document
    const hasButtonRole = activeElement?.getAttribute('role') === 'button'
    if (hasButtonRole && ['Spacebar', ' ', ].includes(event.key)) {
        event.preventDefault()
        activeElement.click()
    }
})



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
		
    twoTimeSpeedNotif.style.opacity="1";
	}, 700);
};
function toggleEndTwoTimeSpeed() {
    clearTimeout(eventTimerId);
    twoTimeSpeedNotif.style.opacity="0";

};
mainVideoClickF.addEventListener('mousedown', toggleTwoTimeSpeed);
mainVideoClickF.addEventListener('mouseup', toggleEndTwoTimeSpeed);
videoPlayer.addEventListener('mouseup', toggleEndTwoTimeSpeed);
videoContainer.addEventListener('mouseup', toggleEndTwoTimeSpeed);

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


//sliderupdate
mainVideo.addEventListener('timeupdate', function() {
    const proggres = (mainVideo.currentTime / mainVideo.duration) * 100;
    progressShadow.style.width = proggres + "%";
});

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
   

//Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        screen.orientation.lock("landscape-primary");
      }else{
        document.exitFullscreen();
        screen.orientation.unlock();
      }
}
fullscreen.addEventListener('click', toggleFullscreen);
mainVideoClickF.addEventListener("dblclick",  toggleFullscreen);

videoPlayer.classList.contains("fulscreenCustom");
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
      fullscreenIcon.title = "Enter Fullscreen"
      videoPlayer.classList.remove("fulscreenCustom");
      videoPlayer.classList.remove("fulscreenMobileCustom");
    } else {
      fullscreenIcon.src = "./assets/icons/Fullscreen-Exit-icon.svg"
      fullscreenIcon.title = "Exit Fullscreen"
      videoPlayer.classList.add("fulscreenCustom");
      videoPlayer.classList.add("fulscreenMobileCustom");
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
    }
});

autoplay.addEventListener("click", () => {
    autoplay.classList.toggle("active");
    if (autoplay.classList.contains("active")) {
        autoplay.title = "Autoplay is on";
    } else {
        autoplay.title = "Autoplay is off";
    }
  });

function toggleSettingCloseAll() {
    settingsContainer.classList.remove("scOpen");
    settingList.classList.remove("playListToLeft");
    qualityList.classList.remove("qualityListOpen");
    settingsContainer.classList.remove("scQualityWHa");
    settingList.classList.remove("playListToLeft");
    playbackList.classList.remove("playListOpen");
    settingsContainer.classList.remove("scPlaybackWHa");
    settingsContainer.classList.remove("scPlaybackRangeWHa");
    playbackList.classList.remove("playListToLeft");
    customRangePlayback.classList.remove("cusRangePlaybackOpen");

}

setting.addEventListener('click',() => {
    if (settingsContainer.classList.contains("scOpen")) {
        toggleSettingCloseAll();
    } else {
        settingsContainer.classList.add("scOpen");
    }
})
mainVideoClickF.addEventListener('click',toggleSettingCloseAll);
playPause.addEventListener('click', toggleSettingCloseAll);
fastRewind.addEventListener('click', toggleSettingCloseAll);
fastForward.addEventListener('click', toggleSettingCloseAll);
pictureInPicture.addEventListener('click', toggleSettingCloseAll);
fullscreen.addEventListener('click', toggleSettingCloseAll);


qualityBtn.addEventListener('click',() => {
    settingList.classList.add("playListToLeft");
    qualityList.classList.add("qualityListOpen");
    settingsContainer.classList.add("scQualityWHa");
});

qualityCloseBtn.addEventListener('click',() => {
    settingList.classList.remove("playListToLeft");
    qualityList.classList.remove("qualityListOpen");
    settingsContainer.classList.remove("scQualityWHa");
});


playbackSpeedBtn.addEventListener('click',() => {
    settingList.classList.add("playListToLeft");
    playbackList.classList.add("playListOpen");
    settingsContainer.classList.add("scPlaybackWHa");

});
playbackCloseBtn.addEventListener('click',() => {
    settingList.classList.remove("playListToLeft");
    playbackList.classList.remove("playListOpen");
    settingsContainer.classList.remove("scPlaybackWHa");
});

customLinkRangePlayback.addEventListener('click',() => {
    settingsContainer.classList.remove("scPlaybackWHa");
    settingsContainer.classList.add("scPlaybackRangeWHa");
    playbackList.classList.add("playListToLeft");
    customRangePlayback.classList.add("cusRangePlaybackOpen");
});

playbackRangeCloseBtn.addEventListener('click',() => {
    settingsContainer.classList.add("scPlaybackWHa");
    settingsContainer.classList.remove("scPlaybackRangeWHa");
    playbackList.classList.remove("playListToLeft");
    customRangePlayback.classList.remove("cusRangePlaybackOpen");
});
    
qualitys.forEach(event => {
    let quality_html = `<li data-quality="${event.getAttribute('size')}" tabindex="0" role="button">${event.getAttribute('size')}p</li>`;
    quality_ul.insertAdjacentHTML('afterbegin', quality_html);
});

const quality_li = videoPlayer.querySelectorAll(".settingsContainer [data-label='qualityList'] ul li");
  quality_li.forEach((event) => {
    event.addEventListener('click', (e) => {
      let quality = event.getAttribute('data-quality');
      removeActiveClasses(quality_li);
      event.classList.add('active');
      deafultQuality.style.display="none";


      qualitys.forEach(event => {
        if (event.getAttribute('size') == quality) {
          let video_current_duration = mainVideo.currentTime;
          let video_source = event.getAttribute('src');
          qualityStatus.textContent = `${quality}p`;
          mainVideo.src = video_source;
          mainVideo.currentTime = video_current_duration;
          mainVideo.play()
        }
      })
    })
})
function removeActiveClasses(e) {
    e.forEach((event) => {
      event.classList.remove("active");
    });
}


playback.forEach(playback => {
    playback.addEventListener('click',() => {
        removePlaybackActiveClasses(playback);
        playback.classList.add("active");

        let speed = playback.getAttribute("data-speed");

        rangeCustomPlayback.value = speed * 100;

        let cusPlayback = rangeCustomPlayback.value / 100;
        mainVideo.playbackRate = cusPlayback;
        
        PlaybackRangeValue.textContent = `${cusPlayback}x`;

        playbackStatus.textContent = speed;
        if (speed == 1) {
            playbackStatus.textContent = "Normal";
        }
    })
    
    rangeCustomPlayback.addEventListener('input',() => {
        let cusPlayback = rangeCustomPlayback.value / 100;
        mainVideo.playbackRate = cusPlayback;

        let speed = playback.getAttribute("data-speed");
        let togglePlaybackStatus = customPlaybackStatus.getAttribute("data-speed");
        PlaybackRangeValue.textContent = `${cusPlayback}x`;
        if (cusPlayback == speed) {
            removePlaybackActiveClasses(playback);
            playback.classList.add("active");
        }

        playbackStatus.textContent = cusPlayback;
        if (cusPlayback == 1) {
            playbackStatus.textContent = "Normal";
        }
    })
})

function removePlaybackActiveClasses() {
    playback.forEach(playback => {
        playback.classList.remove("active");
    })
}



});//end