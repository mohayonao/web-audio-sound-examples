"use strict";

function example01(audioContext, coin) {
  const destination = audioContext.destination;
  const t0 = audioContext.currentTime;

  coin(destination, t0);
}

function example02(audioContext, coin) {
  const destination = audioContext.destination;

  function loop() {
    const t0 = audioContext.currentTime;

    coin(destination, t0, { volume: 0.125 });

    setTimeout(() => loop(), 500);
  }

  loop();
}

module.exports = {
  name: "coin",
  sound: require("../sounds/coin"),
  examples: [ example01, example02 ]
};
