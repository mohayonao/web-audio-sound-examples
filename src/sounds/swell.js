"use strict";

function swell(destination, playbackTime, opts) {
  const t0 = playbackTime;
  const t1 = t0 + opts.attackTime;
  const t2 = t1 + opts.decayTime;
  const audioContext = destination.context;
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const frequency = opts.frequency;
  const volume = opts.volume;

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

module.exports = swell;
