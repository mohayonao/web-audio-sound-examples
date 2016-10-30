"use strict";

function swell(destination, playbackTime, opts) {
  var t0 = playbackTime;
  var t1 = t0 + opts.duration * 0.3;
  var t2 = t1 + opts.duration * 0.7;
  var audioContext = destination.context;
  var oscillator1 = audioContext.createOscillator();
  var oscillator2 = audioContext.createOscillator();
  var gain = audioContext.createGain();
  var frequency = opts.frequency;
  var volume = opts.volume;

  oscillator1.type = "sine";
  oscillator1.frequency.value = frequency;
  oscillator1.detune.setValueAtTime(-2, t0);
  oscillator1.detune.linearRampToValueAtTime(-12, t2);
  oscillator1.start(t0);
  oscillator1.stop(t2);
  oscillator1.connect(gain);

  oscillator2.type = "sine";
  oscillator2.frequency.value = frequency;
  oscillator2.detune.setValueAtTime(+2, t0);
  oscillator2.detune.linearRampToValueAtTime(+12, t2);
  oscillator2.start(t0);
  oscillator2.stop(t2);
  oscillator2.connect(gain);

  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(volume, t1);
  gain.gain.linearRampToValueAtTime(0.0, t2);
  gain.connect(destination);
}

function example01(audioContext, swell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  var destination = audioContext.destination;
  var t0 = audioContext.currentTime;

  swell(destination, t0, { frequency: mtof(69), duration: 4, volume: 0.25 });
}

function example02(audioContext, swell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  var destination = audioContext.destination;
  var t0 = audioContext.currentTime;

  swell(destination, t0, { frequency: mtof(69), duration: 4, volume: 0.125 });
  swell(destination, t0, { frequency: mtof(74), duration: 4, volume: 0.125 });
  swell(destination, t0, { frequency: mtof(79), duration: 4, volume: 0.125 });
}

function example03(audioContext, swell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  var destination = audioContext.destination;
  var t0 = audioContext.currentTime;
  var t1 = t0 + 4;
  var t2 = t1 + 2;

  swell(destination, t0, { frequency: mtof(69), duration: 8, volume: 0.125 });
  swell(destination, t1, { frequency: mtof(79), duration: 6, volume: 0.125 });
  swell(destination, t2, { frequency: mtof(76), duration: 4, volume: 0.125 });
}

module.exports = {
  name: "swell",
  sound: swell,
  examples: [ example01, example02, example03 ]
};
