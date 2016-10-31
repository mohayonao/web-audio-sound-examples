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

module.exports = beep;
