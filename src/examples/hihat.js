"use strict";

function example01(audioContext, hihat) {
  function whitenoise(audioContext, length) {
    const data = new Float32Array(length).map(() => Math.random() * 2 - 1);
    const buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const noise = whitenoise(audioContext, 16384);

  hihat(destination, t0, { noise: noise, duration: 0.025, volume: 0.25 });
}

function example02(audioContext, hihat) {
  function whitenoise(audioContext, length) {
    const data = new Float32Array(length).map(() => Math.random() * 2 - 1);
    const buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  const destination = audioContext.destination;
  const noise = whitenoise(audioContext, 16384);

  function loop(counter) {
    const interval = 0.125;
    const t0 = audioContext.currentTime;
    const duration = 0.025;
    const volume = [ 0.25, 0.05, 0.125, 0.075 ][counter % 4];

    hihat(destination, t0, { noise, duration, volume });

    setTimeout(() => loop(counter + 1), interval * 1000);
  }

  loop(0);
}

function example03(audioContext, hihat) {
  function whitenoise(audioContext, length) {
    const data = new Float32Array(length).map(() => Math.random() * 2 - 1);
    const buffer = audioContext.createBuffer(1, data.length, audioContext.sampleRate);

    buffer.getChannelData(0).set(data);

    return buffer;
  }

  const destination = audioContext.destination;
  const noise = whitenoise(audioContext, 16384);

  function loop() {
    const interval = 0.25;
    const t0 = audioContext.currentTime;
    const counter = Math.ceil(Math.random() * 4);
    const duration = 0.125 / counter;

    for (let i = 0; i < counter; i++) {
      const t1 = t0 + (interval / counter) * i;
      const volume = [ 0.1, 0.025, 0.15, 0.05 ][i];

      hihat(destination, t1, { noise, duration, volume });
    }

    setTimeout(() => loop(), interval * 1000);
  }

  loop();
}

module.exports = {
  name: "hihat",
  sound: require("../sounds/hihat"),
  examples: [ example01, example02, example03 ]
};
