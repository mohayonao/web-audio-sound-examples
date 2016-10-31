"use strict";

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
  sound: require("../sounds/fm-bell"),
  examples: [ example01, example02 ]
};
