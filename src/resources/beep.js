"use strict";

function example01(audioContext, beep) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  beep(destination, t0, { frequency: mtof(105), gain: 0.5 });
}

function example02(audioContext, beep) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.05;

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  beep(destination, t0, { frequency: mtof(105), gain: 0.5 });
  beep(destination, t1, { frequency: mtof(105), gain: 0.25 });
}

function example03(audioContext, beep) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.1;

  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  beep(destination, t0, { frequency: mtof(105), gain: 0.5 });
  beep(destination, t1, { frequency: mtof(117), gain: 0.125 });
}

module.exports = {
  name: "beep",
  sound: require("../sounds/beep"),
  examples: [ example01, example02, example03 ]
};
