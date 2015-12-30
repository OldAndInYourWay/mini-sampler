//============== Initialize Audio Context IF Web Audio API is available ==================
var AudioContextConstructor = (window.AudioContext || window.webkitAudioContext ||  window.mozAudioContext || window.oAudioContext || window.msAudioContext);

var sounds = [
              './samplecollection1/kick2.wav',
              './samplecollection1/snare2.wav',
              './samplecollection1/kick.wav',
              './samplecollection1/hat_opened.wav',
              './samplecollection1/hat_closed.wav',
              './samplecollection1/clap.wav', 
              './samplecollection1/sound1.wav',
              './samplecollection1/sound2.wav'
            ];

var kits = {
                kit0: [
                      './samplecollection1/kick2.wav',
                      './samplecollection1/snare2.wav',
                      './samplecollection1/kick.wav',
                      './samplecollection1/hat_opened.wav',
                      './samplecollection1/hat_closed.wav',
                      './samplecollection1/clap.wav', 
                      './samplecollection1/sound1.wav',
                      './samplecollection1/sound2.wav'
                      ],
    
                kit1 : ['./samplecollection2/Kick06.wav',
                       './samplecollection2/Kit_Hat01.wav',
                       './samplecollection2/Kit_Kick.wav',
                       './samplecollection2/Kit_Snare01.wav',
                       './samplecollection2/Kit_Snare06.wav',
                       './samplecollection2/Kit_Tom01.wav',
                       './samplecollection2/Ride06.wav',
                       './samplecollection2/Snare_Roll01.wav'
                        ],
                kit2 : ['./samplecollection3/1.wav',
                       './samplecollection3/2.wav',
                       './samplecollection3/3.wav',
                       './samplecollection3/4.wav',
                       './samplecollection3/5.wav',
                       './samplecollection3/6.mp3',
                       './samplecollection3/7.wav',
                       './samplecollection3/1.wav']

                        };
var initialized;
window.onload = init(kits['kit0']);
window.bpm = 300;
var context;
var bufferLoader;
var sampleList;
var slider = {
    state: "unlocked",
    isLocked: function(){
        return this.state === "locked";
    },
    $slider: $('#slider'),
    setBPM: function(val) { 
        this.$slider.slider("value", val);
    },
    lockSlider: function (){
        this.state = "locked";
        this.$slider.slider( "disable" );
    },
    unlockSlider: function (){
        this.state = "unlocked";
        this.$slider.slider( "enable" );
    }
}


//=========== INITIALIZE SAMPLES ============
function init(kit) {
  if(!initialized){
      //The Audio Context should be initialized only once
      if(AudioContextConstructor){
          context = new AudioContextConstructor();
          initialized = true;
      } 
  }
  
  bufferLoader = new BufferLoader(
    context,
    kit,
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

 //=== SELECT KIT =====
    $('.kit').click(function() {
        init(kits[$(this).attr("id")]);
        initNames($(this).attr("id"));
        slider.unlockSlider();
        
        if($(this).attr("id") == "kit0") initScreen($(this).attr("id") + " - Default Kit");
        if($(this).attr("id") == "kit1") initScreen($(this).attr("id") + " - Jazz Kit");
        if($(this).attr("id") == "kit2") {
            initScreen($(this).attr("id") + " - \"Riot\" Kit");
            slider.setBPM(430); //this is computed in some sort of convoluted way, you have to debug how this is working
            slider.lockSlider();
        }
//        if($(this).attr("id") == "kit3")
//        if($(this).attr("id") == "kit4")
//        if($(this).attr("id") == "kit5")
                                
    });

/**
 * Gets the browser name or returns an empty string if unknown. 
 * This function also caches the result to provide for any 
 * future calls this function has.
 *
 * @returns {string}
 */
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera;// Chrome 1+
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

    return (browser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        '');
};
    