"use strict";

const initState = {
  preview: false,
  sound  : "",
  example: -1,
};

module.exports = (state = initState, action) => {
  switch (action.type) {
  case "STOP":
    return Object.assign({}, state, { preview: false });
  case "CLEAR":
    return Object.assign({}, state, { sound: "", example: -1, preview: false });
  case "EXECUTE":
    return Object.assign({}, state, { preview: true });
  case "SELECT_SOUND":
    return Object.assign({}, state, { sound: action.sound, example: -1 });
  case "SELECT_EXAMPLE":
    return Object.assign({}, state, { example: action.index });
  }
  return state;
};
