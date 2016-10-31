"use strict";

function hihat(destination, playbackTime, opts) {
  const t0 = playbackTime;
  const t1 = t0 + opts.duration;
  const audioContext = destination.context;
  const bufferSource = audioContext.createBufferSource();
  const biquadFilter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  const noise = opts.noise;
  const cutoff = opts.cutoff;
  const volume = opts.volume;

  bufferSource.buffer = noise;
  bufferSource.loop = true;
  bufferSource.start(t0);
  bufferSource.stop(t1);
  bufferSource.connect(biquadFilter);

  biquadFilter.type = "highpass";
  biquadFilter.frequency.value = cutoff;
  biquadFilter.Q.value = 16;
  biquadFilter.connect(gain);

  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(1e-2, t1);
  gain.connect(destination);
}

module.exports = hihat;
