"use strict";

function beep(destination, playbackTime, opts) {
  const t0 = playbackTime;
  const t1 = t0 + 0.025;
  const audioContext = destination.context;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = opts.frequency;
  oscillator.start(t0);
  oscillator.stop(t1);
  oscillator.connect(gain);

  gain.gain.value = opts.gain;
  gain.connect(destination);
}

module.exports = beep;
