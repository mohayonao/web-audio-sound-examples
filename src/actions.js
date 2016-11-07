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
  link() {
    return { type: "LINK" };
  },
  execute(soundFn, exampleFn) {
    return { type: "EXECUTE", soundFn, exampleFn };
  },
  selectSoundName(name) {
    return { type: "SELECT_SOUND_NAME", name };
  },
  selectExampleId(index) {
    return { type: "SELECT_EXAMPLE_ID", index };
  },
  setFloatTimeDomainData(array) {
    return { type: "SET_FLOAT_TIME_DOMAIN_DATA", array };
  }
};
