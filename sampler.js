//============== Initialize Audio Context IF Web Audio API is available ==================
var AudioContextConstructor = (window.AudioContext || window.webkitAudioContext ||  window.mozAudioContext || window.oAudioContext || window.msAudioContext);

var sounds = [
              './samplecollection1/dbk7.wav',
              './samplecollection1/snare.wav',
              './samplecollection1/note5.wav',
              './samplecollection1/note1.wav',
              './samplecollection1/note2.mp3',
              './samplecollection1/note3.mp3', 
              './samplecollection1/note4.wav',
              './samplecollection1/note6.wav'
            ];

window.onload = init;
var context;
var bufferLoader;
var sampleList;

//=========== INITIALIZE SAMPLES ============
function init() {
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    sounds,
    finishedLoading
    );

  bufferLoader.load();
}

//=========== PLAY SAMPLE =============
//== Play a sample through playPadPosition(i);

function playPadPosition(pos){
    var sample = context.createBufferSource();
    sample.buffer = sampleList[pos];
    playSound(sample.buffer);
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}

function finishedLoading(bufferList) {
//========== update samples list =======
    sampleList = bufferList; 
}


    