"use strict";

const timerAPI = require("../timerAPI");

class SoundPreview {
  constructor(audioContext, actions) {
    this.audioContext = audioContext;
    this.actions = actions;

    this._destination = audioContext.destination;
    this._gain = null;
    this._analyser = null;
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

    timerAPI.clearAllTimer();

    this._gain = this.audioContext.createGain();
    this._analyser = this.audioContext.createAnalyser();

    this._gain.channelCount = 2;
    this._gain.channelCountMode = "explicit";
    this._gain.connect(this._analyser);

    this._analyser.channelCount = 2;
    this._analyser.channelCountMode = "explicit";
    this._analyser.connect(this._destination);

    Object.defineProperty(this.audioContext, "destination", {
      value: this._gain, enumerable: false, writable: false, configurable: true
    });
  }
}

module.exports = SoundPreview;
