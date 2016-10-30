"use strict";

function fmbell(destination, playbackTime, opts) {
  function FMOperator(audioContext, type) {
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
  const op1 = new FMOperator(audioContext, "sine");
  const op2 = new FMOperator(audioContext, "sine");

  op1.frequency.value = opts.frequency;
  op1.gain.setValueAtTime(opts.gain, t0);
  op1.gain.linearRampToValueAtTime(0, t2);
  op1.start(t0);
  op1.stop(t2);
  op1.connect(destination);

  op2.frequency.value = opts.frequency * 3.5;
  op2.gain.setValueAtTime(opts.frequency * opts.color, t0);
  op2.gain.linearRampToValueAtTime(opts.frequency, t1);
  op2.start(t0);
  op2.stop(t2);
  op2.connect(op1.frequency);
}

module.exports = fmbell;
