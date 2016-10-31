"use strict";

function coin(destination, playbackTime, opts) {
  opts = opts || {};
  const t0 = playbackTime;
  const t1 = t0 + 0.075;
  const t2 = t1 + 0.825;
  const audioContext = destination.context;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const volume = opts.volume || 0.25;

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(987.7666025122483, t0);
  oscillator.frequency.setValueAtTime(1318.5102276514797, t1);
  oscillator.start(t0);
  oscillator.stop(t2);
  oscillator.connect(gain);

  gain.gain.setValueAtTime(volume, t0);
  gain.gain.setValueAtTime(volume, t1);
  gain.gain.linearRampToValueAtTime(0, t2);
  gain.connect(destination);
}

module.exports = coin;
