/* global Float32Array */

"use strict";

function hihat(destination, playbackTime, opts) {
  var t0 = playbackTime;
  var t1 = t0 + opts.duration;
  var audioContext = destination.context;
  var bufferSource = audioContext.createBufferSource();
  var biquadFilter = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();
  var noise = opts.noise;
  var volume = opts.volume;

  bufferSource.buffer = noise;
  bufferSource.loop = true;
  bufferSource.start(t0);
  bufferSource.stop(t1);
  bufferSource.connect(biquadFilter);

  biquadFilter.type = "highpass";
  biquadFilter.frequency.value = 10000;
  biquadFilter.Q.value = 16;
  biquadFilter.connect(gain);

  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(1e-2, t1);
  gain.connect(destination);
}

function example01(audioContext, hihat) {
  function whitenoise(audioContext, length) {
    var data = new Float32Array(length).map(function() {
      return Math.random() * 2 - 1;
    });
    var buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  var destination = audioContext.destination;
  var t0 = audioContext.currentTime;
  var noise = whitenoise(audioContext, 16384);

  hihat(destination, t0, { noise: noise, duration: 0.025, volume: 0.25 });
}

function example02(audioContext, hihat) {
  function whitenoise(audioContext, length) {
    var data = new Float32Array(length).map(function() {
      return Math.random() * 2 - 1;
    });
    var buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  var destination = audioContext.destination;
  var noise = whitenoise(audioContext, 16384);
  var counter = 0;

  setInterval(function() {
    var t0 = audioContext.currentTime;
    var volume = [ 0.25, 0.05, 0.125, 0.075 ][counter];

    hihat(destination, t0, { noise: noise, duration: 0.025, volume: volume });

    counter = (counter + 1) % 4;
  }, 125);
}

function example03(audioContext, hihat) {
  function whitenoise(audioContext, length) {
    var data = new Float32Array(length).map(function() {
      return Math.random() * 2 - 1;
    });
    var buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  var destination = audioContext.destination;
  var noise = whitenoise(audioContext, 16384);

  setInterval(function() {
    var t0 = audioContext.currentTime;
    var counter = Math.ceil(Math.random() * 4);
    var duration = 0.125 / counter;
    var interval = 0.25 / counter;

    for (var i = 0; i < counter; i++) {
      var t1 = t0 + interval * i;
      var volume = [ 0.1, 0.025, 0.15, 0.05 ][i];

      hihat(destination, t1, { noise: noise, duration: duration, volume: volume });
    }
  }, 250);
}

module.exports = {
  name: "hihat",
  sound: hihat,
  examples: [ example01, example02, example03 ]
};
