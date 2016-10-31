"use strict";

function beep(destination, playbackTime, opts) {
  const t0 = playbackTime;
  const t1 = t0 + 0.025;
  const audioContext = destination.context;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const frequency = opts.frequency;
  const volume = opts.volume;

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  oscillator.start(t0);
  oscillator.stop(t1);
  oscillator.connect(gain);

  gain.gain.value = volume;
  gain.connect(destination);
}

function example01(audioContext, beep) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  beep(destination, t0, { frequency: mtof(105), volume: 0.5 });
}

function example02(audioContext, beep) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.05;

  beep(destination, t0, { frequency: mtof(105), volume: 0.5 });
  beep(destination, t1, { frequency: mtof(105), volume: 0.25 });
}

function example03(audioContext, beep) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.1;

  beep(destination, t0, { frequency: mtof(105), volume: 0.5 });
  beep(destination, t1, { frequency: mtof(117), volume: 0.125 });
}

module.exports = {
  name: "beep",
  sound: beep,
  examples: [ example01, example02, example03 ]
};
