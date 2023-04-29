console.log("Welcome to Spotify clone");

let songIndex=0;
let audioElement= new Audio('songs/1.mp3');
let play=document.getElementById('play');
let player=document.getElementById('player');
let previous=document.getElementById('previous');
let next=document.getElementById('next');
let gif=document.getElementById('gif');
let songcontainer=Array.from(document.getElementsByClassName('songcontainer'));
let songplay =Array.from(document.getElementsByClassName('songplay'));


let songs = [
    {songName: "Smells Like Teen Spirit", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Take Me Home, Country Roads", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Stayin Alive", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Somebody That I Used To Know", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sweet Child O’Mine", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Shake Your Groove Thing", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Can’t Help Falling In Love-Elvis Presley", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Come As You Are", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Welcome To The Jungle", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// Handle play pause 
play.addEventListener(('click'),()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-pause-circle');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-circle-play');
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});

// Handling loop
audioElement.addEventListener('ended', function() {
    if(songIndex>=9){
        songIndex=0;
        document.getElementById('9').classList.remove('fa-pause-circle');
        document.getElementById('9').classList.add('fa-circle-play');

        document.getElementById('0').classList.remove('fa-circle-play');
        document.getElementById('0').classList.add('fa-pause-circle');
    }
    else{
        songIndex+=1;
        document.getElementById(songIndex-1).classList.remove('fa-pause-circle');
        document.getElementById(songIndex-1).classList.add('fa-circle-play');

        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
    }
    audioElement.currentTime = 0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.play();
}, false);


// progressbar update 
audioElement.addEventListener('timeupdate',()=>{
    progressbar=parseInt((audioElement.currentTime/audioElement.duration)*100);
    player.value=progressbar;
})

player.addEventListener('change',()=>{
    audioElement.currentTime=player.value*audioElement.duration/100;
})

// making all song play 
const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName('songplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(e.target.classList.contains('fa-pause-circle')){
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-circle-play');
            play.classList.remove('fa-pause-circle');
            play.classList.add('fa-circle-play');
            gif.style.opacity=0;
        }
        else{
            makeAllPlay();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            audioElement.src=`songs/${songIndex+1}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
        document.getElementById('9').classList.remove('fa-pause-circle');
        document.getElementById('9').classList.add('fa-circle-play');

        document.getElementById('0').classList.remove('fa-circle-play');
        document.getElementById('0').classList.add('fa-pause-circle');
        
    }
    else{
        songIndex+=1;
        document.getElementById(songIndex-1).classList.remove('fa-pause-circle');
        document.getElementById(songIndex-1).classList.add('fa-circle-play');

        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})


document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
        document.getElementById('0').classList.remove('fa-pause-circle');
        document.getElementById('0').classList.add('fa-circle-play');
    
        document.getElementById('9').classList.remove('fa-circle-play');
        document.getElementById('9').classList.add('fa-pause-circle');
        
    }
    else{
        songIndex-=1;
        document.getElementById(songIndex+1).classList.remove('fa-pause-circle');
        document.getElementById(songIndex+1).classList.add('fa-circle-play');
    
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-pause-circle');
    document.getElementById(songIndex+1).classList.remove('fa-pause-circle');
    document.getElementById(songIndex+1).classList.add('fa-circle-play');

    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    gif.style.opacity=1;
})
