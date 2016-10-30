"use strict";

function example01(audioContext, beep) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  beep(destination, t0, { frequency: 3520 });
}

function example02(audioContext, beep) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.075;

  beep(destination, t0, { frequency: 3520 });
  beep(destination, t1, { frequency: 3520 });
}

function example03(audioContext, beep) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;
  const t1 = t0 + 0.1;

  beep(destination, t0, { frequency: 3520 });
  beep(destination, t1, { frequency: 3520 * 2 });
}

module.exports = {
  name: "beep",
  sound: require("../sounds/beep"),
  examples: [ example01, example02, example03 ]
};
