"use strict";

function example01(audioContext, swell) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  swell(destination, t0, { frequency: mtof(69), duration: 4, gain: 0.25 });
}

function example02(audioContext, swell) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  swell(destination, t0, { frequency: mtof(69), duration: 4, gain: 0.125 });
  swell(destination, t0, { frequency: mtof(74), duration: 4, gain: 0.125 });
  swell(destination, t0, { frequency: mtof(79), duration: 4, gain: 0.125 });
}

function example03(audioContext, swell) {
  var destination = audioContext.destination;
  var t0 = audioContext.currentTime;
  var t1 = t0 + 4;
  var t2 = t1 + 2;

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  swell(destination, t0, { frequency: mtof(69), duration: 8, gain: 0.125 });
  swell(destination, t1, { frequency: mtof(79), duration: 6, gain: 0.125 });
  swell(destination, t2, { frequency: mtof(76), duration: 4, gain: 0.125 });
}

module.exports = {
  name: "swell",
  sound: require("../sounds/swell"),
  examples: [ example01, example02, example03 ]
};
