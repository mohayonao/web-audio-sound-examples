"use strict";

const timerAPI = require("../timerAPI");
const StereoPannerNode = require("stereo-panner-node");
const StereoAnalyserNode = require("stereo-analyser-node");

class SoundPreview {
  constructor(audioContext, actions) {
    StereoPannerNode.polyfill();

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
      this._timerId = setInterval(this.analyse.bind(this), 50);
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

    this._bufSrc = this.audioContext.createBufferSource();
    this._gain = this.audioContext.createGain();
    this._analyser = new StereoAnalyserNode(this.audioContext);

    this._gain.channelCount = 2;
    this._gain.channelCountMode = "explicit";

    this._analyser.channelCount = 2;
    this._analyser.channelCountMode = "explicit";

    this._bufSrc.buffer = this.audioContext.createBuffer(1, 128, this.audioContext.sampleRate);
    this._bufSrc.loop = true;
    this._bufSrc.start(this.audioContext.currentTime);
    this._bufSrc.connect(this._gain);

    this._gain.connect(this._analyser);

    this._analyser.fftSize = 256;
    this._analyser.connect(this._destination);

    this.actions.setAnalysedData([], [], [], []);

    Object.defineProperty(this.audioContext, "destination", {
      value: this._gain, enumerable: false, writable: false, configurable: true
    });
  }

  analyse() {
    const timeDomainL = new Float32Array(this._analyser.fftSize);
    const timeDomainR = new Float32Array(this._analyser.fftSize);
    const frequencyL = new Float32Array(this._analyser.frequencyBinCount);
    const frequencyR = new Float32Array(this._analyser.frequencyBinCount);

    this._analyser.getFloatTimeDomainData(timeDomainL, timeDomainR);
    this._analyser.getFloatFrequencyData(frequencyL, frequencyR);

    this.actions.setAnalysedData(timeDomainL, timeDomainR, frequencyL, frequencyR);
  }
}

module.exports = SoundPreview;
