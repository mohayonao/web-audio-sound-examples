"use strict";

const initState = {
  preview  : false,
  soundName: "",
  exampleId: -1,
  analysedData: {
    timeDomainL: [],
    timeDomainR: [],
    frequencyL: [],
    frequencyR: [],
  },
};

module.exports = (state = initState, action) => {
  switch (action.type) {
  case "STOP":
    return Object.assign({}, state, { preview: false });
  case "CLEAR":
    return Object.assign({}, state, { soundName: "", exampleId: -1, preview: false });
  case "EXECUTE":
    return Object.assign({}, state, { preview: true });
  case "SELECT_SOUND_NAME":
    return Object.assign({}, state, { soundName: action.name });
  case "SELECT_EXAMPLE_ID":
    return Object.assign({}, state, { exampleId: action.index });
  case "SET_ANALYSED_DATA":
    return Object.assign({}, state, { analysedData: action.data });
  }
  return state;
};
