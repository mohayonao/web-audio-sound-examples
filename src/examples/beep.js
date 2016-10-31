"use strict";

function example01(audioContext, beep) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  beep(destination, t0, { frequency: mtof(105), volume: 0.5 });
}

function example02(audioContext, beep) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.05;

  beep(destination, t0, { frequency: mtof(105), volume: 0.5 });
  beep(destination, t1, { frequency: mtof(105), volume: 0.25 });
}

function example03(audioContext, beep) {
  function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.1;

  beep(destination, t0, { frequency: mtof(105), volume: 0.5 });
  beep(destination, t1, { frequency: mtof(117), volume: 0.125 });
}

module.exports = {
  name: "beep",
  sound: require("../sounds/beep"),
  examples: [ example01, example02, example03 ]
};
