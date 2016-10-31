"use strict";

module.exports = {
  run() {
    return { type: "RUN" };
  },
  stop() {
    return { type: "STOP" };
  },
  clear() {
    return { type: "CLEAR" };
  },
  execute(soundFn, exampleFn) {
    return { type: "EXECUTE", soundFn, exampleFn };
  },
  selectSoundName(name) {
    return { type: "SELECT_SOUND_NAME", name };
  },
  selectExampleId(index) {
    return { type: "SELECT_EXAMPLE_ID", index };
  }
};
