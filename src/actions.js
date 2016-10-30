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
  execute(sound, example) {
    return { type: "EXECUTE", sound, example };
  },
  selectSound(sound) {
    return { type: "SELECT_SOUND", sound };
  },
  selectExample(index) {
    return { type: "SELECT_EXAMPLE", index };
  }
};
