const player = document.getElementById('audioPlayer')
const prev = document.getElementById('prev')
const play = document.getElementById('play')
const pause = document.getElementById('pause')
pause.style.display = 'none'
const next = document.getElementById('next')
const musicTitle = document.getElementById('musicTitle')
const artist = document.getElementById('artist')
const album = document.getElementById('album')
const coverImage = document.getElementById('coverImage')
const duration = document.getElementById('duration')
const currentTime = document.getElementById('currentDuration')
const progress_container = document.getElementById('progress_container')
const progress = document.getElementById('progress')


// init music indexing
let musicIndex = 0;

// get music from dom
const musics = JSON.parse(document.getElementById('musics').textContent)

console.log(musics);


// functions
const setSRC = () => {
    player.src = `/media/${musics[musicIndex].audio_file}`
    musicTitle.textContent = musics[musicIndex].title
    artist.textContent = musics[musicIndex].artist
    coverImage.setAttribute('src', `/media/${musics[musicIndex].cover_image}`)
    if (musics[musicIndex].album__name !== null){
        album.textContent = musics[musicIndex].album__name
    } else {
        album.textContent = 'Single'
    }
}

const playOrPause = () => {
    if (player.paused){
        player.play()
        play.style.display = 'none'
        pause.style.display = 'block'
    } else {
        player.pause()
        play.style.display = 'block'
        pause.style.display = 'none'
    }
}

const formatAudioLength = (secounds) => {
    let min = Math.floor((secounds%3600)/60)
    let sec = Math.floor(secounds%60)
    if (sec < 10){
        sec = `0${sec}`
    }
    return `${min}:${sec}`
}

// load music on refresh
setSRC()
player.pause()

// play
play.addEventListener('click', () => {
    playOrPause()
})
// pause
pause.addEventListener('click', () => {
    playOrPause()
})

// update progress bar
player.addEventListener('timeupdate', () => {
    let sec = player.currentTime
    console.log('sec', player.currentTime);
    let total = player.duration

    currentTime.textContent = formatAudioLength(player.currentTime)

    let progress_container_width = progress_container.offsetWidth
    let progress_width = progress.offsetWidth
    let audio_played = ( sec / total ) *100
    let newWidth =  progress_container_width * (audio_played / 100)
    progress.style.width = `${newWidth}px`
})

// prev track
prev.addEventListener('click', () => {
    musicIndex = musicIndex - 1
    if (musicIndex < 0) {
        musicIndex = musics.length - 1
    }
    setSRC()
    playOrPause()
})

// next track
next.addEventListener('click', () => {
    musicIndex = musicIndex + 1
    if (musicIndex > (musics.length - 1)) {
        musicIndex = 0
    }
    setSRC()
    playOrPause()
})


// load duration for ui
player.addEventListener('loadedmetadata', () => {
    duration.textContent = formatAudioLength(player.duration)
})