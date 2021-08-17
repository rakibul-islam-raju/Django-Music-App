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
const currentDuration = document.getElementById('currentDuration')


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
    } else {
        player.pause()
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
    play.style.display = 'none'
    pause.style.display = 'block'
    playOrPause()
})
// pause
pause.addEventListener('click', () => {
    play.style.display = 'block'
    pause.style.display = 'none'
    playOrPause()
})


// load duration for ui
player.addEventListener('loadedmetadata', () => {
    duration.textContent = formatAudioLength(player.duration)
})