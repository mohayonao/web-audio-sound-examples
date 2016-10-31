"use strict";

function fmbell(destination, playbackTime, opts) {
  function operator(audioContext, type) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.connect(gain);

    gain.frequency = oscillator.frequency;
    gain.detune = oscillator.detune;
    gain.start = oscillator.start.bind(oscillator);
    gain.stop = oscillator.stop.bind(oscillator);

    return gain;
  }

  const t0 = playbackTime;
  const t1 = t0 + opts.duration * 0.5;
  const t2 = t1 + opts.duration * 0.5;
  const audioContext = destination.context;
  const op1 = operator(audioContext, "sine");
  const op2 = operator(audioContext, "sine");
  const frequency = opts.frequency;
  const volume = opts.volume;
  const color = opts.color;

  op1.frequency.value = frequency;
  op1.gain.setValueAtTime(volume, t0);
  op1.gain.linearRampToValueAtTime(0, t2);
  op1.start(t0);
  op1.stop(t2);
  op1.connect(destination);

  op2.frequency.value = frequency * 3.5;
  op2.gain.setValueAtTime(frequency * color, t0);
  op2.gain.linearRampToValueAtTime(frequency, t1);
  op2.start(t0);
  op2.stop(t2);
  op2.connect(op1.frequency);
}

function example01(audioContext, fmbell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  fmbell(destination, t0, { frequency: mtof(60), duration: 4, volume: 0.25, color: 8 });
}

function example02(audioContext, fmbell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  fmbell(destination, t0, { frequency: mtof(72), duration: 8, volume: 0.15, color: 4 });
  fmbell(destination, t0, { frequency: mtof(72), duration: 1, volume: 0.05, color: 13 });
}

module.exports = {
  name: "fm-bell",
  sound: fmbell,
  examples: [ example01, example02 ]
};
