const videoContainer=document.querySelector('.videoContainer');

const videoPlayer = document.querySelectorAll('.videoPlayer')
videoPlayer.forEach(videoPlayer => {
    const videoPlayer_html=`${videoPlayer.innerHTML}

`;

    videoPlayer.innerHTML=videoPlayer_html;

    
//sellect all require tags
const mainVideo=videoPlayer.querySelector('#mainVideo'),
mainVideoClickF=videoPlayer.querySelector('.mainVideoClickF'),
mainVideoLeftMinorSensor=videoPlayer.querySelector('.mainVideoLeftMinorSensor'),
headerControllers=videoPlayer.querySelector('.headerControllers'),
controllers=videoPlayer.querySelector('.controllers'),
controllersMobile=videoPlayer.querySelector('.controllersMobile'),
controllersContainer=videoPlayer.querySelector('.controllersContainer'),

progressAreaTime = videoPlayer.querySelector(".progressAreaTime"),

progressArea = videoPlayer.querySelector(".progress-area"),
bufferedBar = videoPlayer.querySelector(".bufferedBar"),
progress_Bar = videoPlayer.querySelector(".progress-bar"),

canvas=videoPlayer.querySelector('#canvas'),
ctx = canvas.getContext("2d"),


fullscreen=videoPlayer.querySelector('#fullscreen'),
fullscreenIcon=videoPlayer.querySelector('#fullscreenIcon'),
fullscreenMobile=videoPlayer.querySelector('#fullscreenMobile'),
fullscreenMobileIcon=videoPlayer.querySelector('#fullscreenMobileIcon'),


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
captionBtn=videoPlayer.querySelector('#captionBtn'),
captionIcon=videoPlayer.querySelector('#captionIcon'),


settingMobile=videoPlayer.querySelector('#settingMobile'),
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

ambientBtn=videoPlayer.querySelector('#ambientBtn'),

slider=videoPlayer.querySelector('.slider'),

theaterMode=videoPlayer.querySelector('#theaterMode'),
theaterIcon=videoPlayer.querySelector('#theaterIcon'),

CaptionListBtn=videoPlayer.querySelector('#CaptionListBtn'),
captionList=videoPlayer.querySelector('.captionList'),
captionCloseBtn=videoPlayer.querySelector('#captionCloseBtn'),
caption_labels=videoPlayer.querySelector(".captionList ul"),
CaptionStatus=videoPlayer.querySelector("#CaptionStatus"),

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
qualitys = videoPlayer.querySelectorAll("source[size]"),
tracks = videoPlayer.querySelectorAll("track");




function getCurrentImage() {
  ctx.drawImage(mainVideo, 0, 0, canvas.width, canvas.height);
}

setInterval(getCurrentImage, 100);



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


mainVideo.addEventListener("timeupdate", (e) => {
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);
    // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
    current.innerHTML = `${currentMin}:${currentSec}`;

    let videoDuration = e.target.duration;
    // progressBar width change
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_Bar.style.width = `${progressWidth}%`;
});

progressArea.addEventListener("pointerdown", (e) => {
    progressArea.setPointerCapture(e.pointerId);
    setTimelinePosition(e);
    progressArea.addEventListener("pointermove", setTimelinePosition);
    progressArea.addEventListener("pointerup", () => {
      progressArea.removeEventListener("pointermove", setTimelinePosition);
    })
  });


function setTimelinePosition(e) {
    let videoDuration = mainVideo.duration;
    let progressWidthval = progressArea.clientWidth + 2;
    let ClickOffsetX = e.offsetX;
    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;

    let progressWidth = (mainVideo.currentTime / videoDuration) * 100;
    progress_Bar.style.width = `${progressWidth}%`;

    let currentVideoTime = mainVideo.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);
    // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
    current.innerHTML = `${currentMin}:${currentSec}`;

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
    drawProgress(bufferedBar, mainVideo.buffered, mainVideo.duration);
})


progressArea.addEventListener("mousemove", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let x = e.offsetX;
    let videoDuration = mainVideo.duration;
    let progressTime = Math.floor((x / progressWidthval) * videoDuration);
    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);
    progressAreaTime.style.setProperty("--x", `${x}px`);
    progressAreaTime.style.display = "block";
    if (x >= progressWidthval - 80) {
      x = progressWidthval - 80;
    } else if (x <= 75) {
      x = 75;
    } else {
      x = e.offsetX;
    }

    // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
    progressAreaTime.innerHTML = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("mouseleave", () => {
    progressAreaTime.style.display = "none";
});



//play pause btn function {
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
//}

//rewind forward btn function {
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
//}

//volume btn function {
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
//}
//volume slider function {
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
//}

//duration function {
mainVideo.addEventListener('loadedmetadata',() => { 
    duration.textContent = formatDuration(mainVideo.duration);
    durationMobile.textContent = formatDuration(mainVideo.duration);
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
//)



//autoplay btn function {
autoplay.addEventListener("click", () => {
    autoplay.classList.toggle("active");
    if (autoplay.classList.contains("active")) {
        autoplay.title = "Autoplay is on";
    } else {
        autoplay.title = "Autoplay is off";
    }
  });
mainVideo.addEventListener("ended", () => {
    if (autoplay.classList.contains("active")) {
      mainVideo.play();
    } else {
      playPause.src = "./assets/icons/Replay-icon.svg";
      playPause.title = "Replay";
    }
});
//}



//setting btn function {
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
    captionList.classList.remove("captionListOpen");
}

setting.addEventListener('click',() => {
    if (settingsContainer.classList.contains("scOpen")) {
        toggleSettingCloseAll();
    } else {
        settingsContainer.classList.add("scOpen");
    }
})
settingMobile.addEventListener('click',() => {
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
autoplay.addEventListener('click', toggleSettingCloseAll);
captionBtn.addEventListener('click', toggleSettingCloseAll);
pictureInPicture.addEventListener('click', toggleSettingCloseAll);
fullscreenMobile.addEventListener('click', toggleSettingCloseAll);
fullscreen.addEventListener('click', toggleSettingCloseAll);

//setting list function
ambientBtn.addEventListener("click", () => {
    slider.classList.toggle("active");
    canvas.classList.toggle("unactive");
});

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

      deafultQuality.addEventListener('click',() => {
        qualityStatus.textContent = `Auto 360p`;
      })

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




CaptionListBtn.addEventListener('click',() => {
    settingList.classList.add("playListToLeft");
    captionList.classList.add("captionListOpen");
    settingsContainer.classList.add("scQualityWHa");
})

captionCloseBtn.addEventListener('click',() => {
    settingList.classList.remove("playListToLeft");
    settingsContainer.classList.remove("scQualityWHa");
    captionList.classList.remove("captionListOpen");
})


if (tracks.length != 0) {
    caption_labels.insertAdjacentHTML(
        "afterbegin",
        `<li data-track="Off" class="active">Off</li>`
      );
    for (let i = 0; i < tracks.length; i++) {
      let trackLi = `<li data-track="${tracks[i].label}">${tracks[i].label}</li>`;
      caption_labels.insertAdjacentHTML("beforeend", trackLi);
    }
}
const caption = captionList.querySelectorAll("ul li");

caption.forEach((event) => {
    let label = event.getAttribute('data-track');
    let Off = "Off";
    event.addEventListener("click", () => {
        removeActiveClasses(caption);
        event.classList.add("active");
        changeCaption(event);
        caption_text.innerHTML = "";
        CaptionStatus.textContent=`${label}`;
        if (label == Off) {
            captionIcon.classList.remove("active")
        } else {
            captionIcon.classList.add("active")
        }
  });
});


let track = mainVideo.textTracks;

function changeCaption(lable) {
  let trackLable = lable.getAttribute("data-track");
  for (let i = 0; i < track.length; i++) {
   track[i].mode = "disabled";
    if (track[i].label == trackLable) {
     track[i].mode = "showing";
   }
 }
}

let caption_text = videoPlayer.querySelector(".caption_text");
for (let i = 0; i < track.length; i++) {
  track[i].addEventListener("cuechange", () => {
    if (track[i].mode === "showing") {
      if (track[i].activeCues[0]) {
        let span = `<span><mark>${track[i].activeCues[0].text}</mark></span>`;
        caption_text.innerHTML = span;
      } else {
        caption_text.innerHTML = "";
      }
    }
  });
}

//caption btn function {
    captionBtn.addEventListener('click',() => {
        if (captionIcon.classList.contains("active")) {
            captionIcon.classList.remove("active")
        } else {
            captionIcon.classList.add("active")
        }
});
//}


//}

//pictureinpicture btn function {
pictureInPicture.addEventListener('click',()=>{
    mainVideo.requestPictureInPicture();
});
//}


theaterMode.addEventListener('click',() => {
    if (videoPlayer.classList.contains("theater")) {
        videoPlayer.classList.remove("theater");
        theaterIcon.src="./assets/icons/TheaterMode.svg";
        theaterIcon.title = "Theater Mode"
    } else {
        videoPlayer.classList.add("theater");
        theaterIcon.src="./assets/icons/TheaterModeExit.svg"
        theaterIcon.title = "Exit Theater Mode"       
    }
});

//fullscreen btn function {
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        screen.orientation.lock("landscape-primary");
        if (mainVideo.paused) return;
        timer = setTimeout(() => {
                controllers.classList.remove('active');
                controllersMobile.classList.remove('active');
                headerControllers.classList.remove('active');
        },0)
      }else{
        document.exitFullscreen();
        screen.orientation.unlock();
        if (mainVideo.paused) return;
        timer = setTimeout(() => {
                controllers.classList.remove('active');
                controllersMobile.classList.remove('active');
                headerControllers.classList.remove('active');
        },0)
      }
}
fullscreen.addEventListener('click', toggleFullscreen);
fullscreenMobile.addEventListener('click', toggleFullscreen);
mainVideoClickF.addEventListener("dblclick",  toggleFullscreen);

videoPlayer.classList.contains("fulscreenCustom");
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
      fullscreenMobileIcon.src = "./assets/icons/Fullscreen-icon.svg"
      fullscreenIcon.title = "Enter Fullscreen"
      videoPlayer.classList.remove("fulscreenCustom");
      videoPlayer.classList.remove("fulscreenMobileCustom");
      mainVideo.classList.remove("fulscreenCustom");
      controllersContainer.classList.remove("activeFullscreen");
      headerControllers.classList.remove("activeFullscreen");
      mainVideoLeftMinorSensor.classList.remove("active");
    } else {
      fullscreenIcon.src = "./assets/icons/Fullscreen-Exit-icon.svg"
      fullscreenMobileIcon.src = "./assets/icons/Fullscreen-Exit-icon.svg"
      fullscreenIcon.title = "Exit Fullscreen"
      videoPlayer.classList.add("fulscreenCustom");
      videoPlayer.classList.add("fulscreenMobileCustom");
      mainVideo.classList.add("fulscreenCustom");
      controllersContainer.classList.add("activeFullscreen");
      headerControllers.classList.add("activeFullscreen");
      mainVideoLeftMinorSensor.classList.add("active");
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
    }
});
//}

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

//mouse touch control show hide event function {
fastForward.onmouseover = fastForward.onmouseout = handler;
fastRewind.onmouseover = fastRewind.onmouseout = handler;
progressArea.onmouseover = progressArea.onmouseout = handler;
volumeBtn.onmouseover = volumeBtn.onmouseout = handler;
autoplay.onmouseover = autoplay.onmouseout = handler;
caption.onmouseover = captionBtn.onmouseout = handler;
setting.onmouseover = setting.onmouseout = handler;
pictureInPicture.onmouseover = pictureInPicture.onmouseout = handler;
fullscreen.onmouseover = fullscreen.onmouseout = handler;

function handler(event) {
    if (event.type == 'mouseover') {
        fastForward.classList.add('active');
      }
      if (event.type == 'mouseout') {
        fastForward.classList.remove('active');
      }
}

let timer;
const hideControlss = () => {
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
        if (settingsContainer.classList.contains("scOpen") 
            || fastForward.classList.contains('active')) {
            headerControllers.classList.add('active');
            controllers.classList.add('active');
            controllersMobile.classList.add('active');
            caption_text.classList.add('active');
        } else {
            headerControllers.classList.remove('active');
            controllers.classList.remove('active');
            controllersMobile.classList.remove('active');
            caption_text.classList.remove('active');
        }
    },3000)
};


mainVideoLeftMinorSensor.addEventListener('mousemove',() => {
    if (mainVideo.paused) return;
    headerControllers.classList.remove('active');
    controllers.classList.remove('active');
    controllersMobile.classList.remove('active');
    caption_text.classList.remove('active');
});

headerControllers.addEventListener('mouseover',() => {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    caption_text.classList.add('active');
    clearTimeout(timer);
    hideControlss();
})

controllers.addEventListener('mouseover',() => {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    caption_text.classList.add('active');
    clearTimeout(timer);
    hideControlss();
})

controllersMobile.addEventListener('mousemove',() => {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    caption_text.classList.add('active');
    clearTimeout(timer);
    hideControlss();
});

mainVideoClickF.addEventListener('mousemove',() => {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    caption_text.classList.add('active');
    clearTimeout(timer);
    hideControlss();
});

playPause.addEventListener('click',() => {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    caption_text.classList.add('active');
    clearTimeout(timer);
    hideControlss();
});

playPauseMobile.addEventListener('click',() => {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    caption_text.classList.add('active');
    clearTimeout(timer);
    hideControlss();
});

mainVideoClickF.addEventListener('mouseout',() => {
    if (mainVideo.paused) return;
    if (settingsContainer.classList.contains("scOpen") 
        || fastForward.classList.contains('active')) {
            headerControllers.classList.add('active');
        controllers.classList.add('active');
        controllersMobile.classList.add('active');
        caption_text.classList.add('active');
    } else {
        headerControllers.classList.remove('active');
        controllers.classList.remove('active');
        controllersMobile.classList.remove('active');
        caption_text.classList.remove('active');
    }
});
controllers.addEventListener('mouseout',() => {
    if (mainVideo.paused) return;
    if (settingsContainer.classList.contains("scOpen") 
        || fastForward.classList.contains('active')) {
        headerControllers.classList.add('active');
        controllers.classList.add('active');
        controllersMobile.classList.add('active');
        caption_text.classList.add('active');
    } else {
        headerControllers.classList.remove('active');
        controllers.classList.remove('active');
        controllersMobile.classList.remove('active');
        caption_text.classList.remove('active');
    }
});

mainVideo.addEventListener('ended' ,myHandler,false);
    function myHandler(){
        headerControllers.classList.add('active');
        controllers.classList.add('active');
        controllersMobile.classList.add('active');
        caption_text.classList.add('active');
};
//}






});//end