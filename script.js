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
const audioCtx = new AudioContext();
let audioSource;
let analyzer;
let bufferLength;
let dataArray;

audioFileInput.addEventListener('change', function(event) {
    let file = event.target.files[0];
    if(file){
        let fileURL = URL.createObjectURL(file);
        audioElement.src = fileURL;
        audioElement.load();
        console.log("Audio file loaded:", file.name);
        
        if(!audioSource){
            audioSource = audioCtx.createMediaElementSource(audioElement);
            analyzer = audioCtx.createAnalyser();
            analyzer.fftSize = 2048;
            
            bufferLength = analyzer.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            audioSource.connect(analyzer);
            analyzer.connect(audioCtx.destination);
        } 
    }
});

playButton.addEventListener('click', function(){
    if(audioElement.src){
        audioElement.play();
        audioCtx.resume();
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
