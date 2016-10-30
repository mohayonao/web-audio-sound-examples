"use strict";

function hihat(destination, playbackTime, opts) {
  const t0 = playbackTime;
  const t1 = t0 + opts.duration;
  const audioContext = destination.context;
  const bufferSource = audioContext.createBufferSource();
  const biquadFilter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();

  bufferSource.buffer = opts.noise;
  bufferSource.loop = true;
  bufferSource.start(t0);
  bufferSource.stop(t1);
  bufferSource.connect(biquadFilter);

  biquadFilter.type = "highpass";
  biquadFilter.frequency.value = 10000;
  biquadFilter.Q.value = 16;
  biquadFilter.connect(gain);

  gain.gain.setValueAtTime(opts.gain, t0);
  gain.gain.exponentialRampToValueAtTime(1e-2, t1);
  gain.connect(destination);
}

module.exports = hihat;