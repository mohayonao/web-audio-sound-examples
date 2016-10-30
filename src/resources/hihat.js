"use strict";

function example01(audioContext, hihat) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  function whitenoise() {
    const data = new Float32Array(16384).map(() => Math.random() * 2 - 1);
    const buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  const noise = whitenoise();

  hihat(destination, t0, { noise, duration: 0.025, gain: 0.25 });
}

function example02(audioContext, hihat) {
  const destination = audioContext.destination;

  function whitenoise() {
    const data = new Float32Array(16384).map(() => Math.random() * 2 - 1);
    const buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  const noise = whitenoise();
  let counter = 0;

  setInterval(() => {
    const t0 = audioContext.currentTime;
    const gain = [ 0.25, 0.05, 0.125, 0.075 ][counter];

    hihat(destination, t0, { noise, duration: 0.025, gain });

    counter = (counter + 1) % 4;
  }, 125);
}

function example03(audioContext, hihat) {
  const destination = audioContext.destination;

  function whitenoise() {
    const data = new Float32Array(16384).map(() => Math.random() * 2 - 1);
    const buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  const noise = whitenoise();

  setInterval(() => {
    const t0 = audioContext.currentTime;
    const counter = Math.ceil(Math.random() * 4);
    const duration = 0.125 / counter;
    const interval = 0.25 / counter;

    for (let i = 0; i < counter; i++) {
      const t1 = t0 + interval * i;
      const gain = [ 0.1, 0.025, 0.15, 0.05 ][i];

      hihat(destination, t1, { noise, duration, gain });
    }
  }, 250);
}

module.exports = {
  name: "hihat",
  sound: require("../sounds/hihat"),
  examples: [ example01, example02, example03 ]
};
