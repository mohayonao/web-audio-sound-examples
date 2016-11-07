"use strict";

const timerAPI = require("../timerAPI");

class SoundPreview {
  constructor(audioContext, actions) {
    this.audioContext = audioContext;
    this.actions = actions;

    this._destination = audioContext.destination;
    this._gain = null;
    this._analyser = null;
    this._timerId = 0;
  }

  doAction(action) {
    switch (action.type) {
    case "EXECUTE":
      return this.execute(action.soundFn, action.exampleFn);
    case "STOP":
      return this.reset();
    case "RESET":
      return this.reset();
    }
  }

  setState() {}

  execute(soundFn, exampleFn) {
    this.reset();
    try {
      exampleFn(this.audioContext, soundFn);
      this._timerId = setInterval(() => {
        const array = new Float32Array(this._analyser.fftSize);

        this._analyser.getFloatTimeDomainData(array);
        this.actions.setFloatTimeDomainData(array);
      }, 60);
    } catch (e) {
      global.console.error(e);
      this.actions.stop();
    }
  }

  reset() {
    if (this._gain !== null) {
      this._gain.disconnect();
      this._analyser.disconnect();
    }

    if (this._timerId !== 0) {
      clearInterval(this._timerId);
    }

    timerAPI.clearAllTimer();

    this._gain = this.audioContext.createGain();
    this._analyser = this.audioContext.createAnalyser();

    this._gain.channelCount = 2;
    this._gain.channelCountMode = "explicit";
    this._gain.connect(this._analyser);

    this._analyser.fftSize = 256;
    this._analyser.channelCount = 2;
    this._analyser.channelCountMode = "explicit";
    this._analyser.connect(this._destination);

    if (typeof this._analyser.getFloatTimeDomainData !== "function") {
      this._analyser.getFloatTimeDomainData = getFloatTimeDomainData;
    }
    this.actions.setFloatTimeDomainData([]);

    Object.defineProperty(this.audioContext, "destination", {
      value: this._gain, enumerable: false, writable: false, configurable: true
    });
  }
}

function getFloatTimeDomainData(array) {
  const uint8 = new Uint8Array(array.length);

  this.getByteTimeDomainData(uint8);

  for (let i = 0, imax = array.length; i < imax; i++) {
    array[i] = (uint8[i] - 128) / 128;
  }
}

module.exports = SoundPreview;
