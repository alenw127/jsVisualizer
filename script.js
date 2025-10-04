let audioFileInput = document.getElementById('audioFileInput');
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let stopButton = document.getElementById('stopButton');
const canvas = document.getElementById("visualizerCanvas")

//canvas settings
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

//calling new audio web api
let audioElement = new Audio();
let audioSource;
let analyser;

audioFileInput.addEventListener('change', function(event) {
    let file = event.target.files[0];
    if(file){
        let fileURL = URL.createObjectURL(file);
        audioElement.src = fileURL;
        audioElement.load();
        console.log("Audio file loaded:", file.name);
    }
});

playButton.addEventListener('click', function(){
    if(audioElement.src){
        audioElement.play();
        console.log("Playing", audioFileInput.files[0].name);
    }else{
        console.log("Haven't loaded anything");
    }
    
});

pauseButton.addEventListener('click', function(){
    if(audioElement.src){
        audioElement.pause();
        console.log("Paused", audioFileInput.files[0].name);
    }else{
        console.log("Haven't loaded anything");
    }
    
});

stopButton.addEventListener('click', function(){
    if(audioElement.src){
        audioFileInput.value = '';
        audioElement.pause();
        audioElement.src = '';
    }else{
        console.log("Haven't loaded anything");
    }
    
});
