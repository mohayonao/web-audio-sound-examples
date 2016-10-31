"use strict";

function example01(audioContext, swell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  swell(destination, t0, { frequency: mtof(69), attackTime: 2, decayTime: 4, volume: 0.25 });
}

function example02(audioContext, swell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  swell(destination, t0, { frequency: mtof(69), attackTime: 6, decayTime: 2, volume: 0.125 });
  swell(destination, t0, { frequency: mtof(74), attackTime: 6, decayTime: 2, volume: 0.125 });
  swell(destination, t0, { frequency: mtof(79), attackTime: 6, decayTime: 2, volume: 0.125 });
}

function example03(audioContext, swell) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 4;
  const t2 = t1 + 2;

  swell(destination, t0, { frequency: mtof(69), attackTime: 4, decayTime: 4, volume: 0.125 });
  swell(destination, t1, { frequency: mtof(79), attackTime: 2, decayTime: 4, volume: 0.125 });
  swell(destination, t2, { frequency: mtof(76), attackTime: 2, decayTime: 2, volume: 0.125 });
}

module.exports = {
  name: "swell",
  sound: require("../sounds/swell"),
  examples: [ example01, example02, example03 ]
};
