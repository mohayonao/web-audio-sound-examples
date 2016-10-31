"use strict";

const CodeMirror = require("codemirror");
const examples = require("../examples");

require("codemirror/mode/javascript/javascript");

class CodeEditor {
  constructor(document, actions) {
    this.actions = actions;
    this._sound = CodeMirror.fromTextArea(document.getElementById("sound"), {
      mode: "javascript", lineNumbers: true,
    });
    this._example = CodeMirror.fromTextArea(document.getElementById("example"), {
      mode: "javascript", lineNumbers: true,
    });
    this._soundName = "";
    this._exampleId = -1;
  }

  doAction(action) {
    switch (action.type) {
    case "RUN":
      return this.run();
    case "CLEAR":
      return this.clear();
    case "SELECT_SOUND_NAME":
      return this.selectSoundName(action.name);
    case "SELECT_EXAMPLE_ID":
      return this.selectExampleId(action.index);
    }
  }

  setState() {}

  run() {
    const soundFn = toFunction(this._sound.getValue());
    const exampleFn = toFunction(this._example.getValue());

    if (soundFn !== null && exampleFn !== null) {
      this.actions.execute(soundFn, exampleFn);
    }
  }

  clear() {
    this._soundName = "";
    this._exampleId = -1;
    this._sound.setValue("");
    this._example.setValue("");
  }

  selectSoundName(name) {
    this._soundName = name;
    if (!examples[this._soundName]) {
      return this.clear();
    }
    this._sound.setValue(examples[this._soundName].sound.toString());
    this.selectExampleId(this._exampleId);
  }

  selectExampleId(index) {
    this._exampleId = index;
    if (!examples[this._soundName] || !examples[this._soundName].examples[this._exampleId]) {
      return this._example.setValue("");
    }
    this._example.setValue(examples[this._soundName].examples[this._exampleId].toString());
  }
}

function toFunction(code) {
  if (code === "") {
    return null;
  }
  try {
    return new Function(`return ${ code }`)();
  } catch (e) {
    global.console.error(e);
  }
  return null;
}

module.exports = CodeEditor;
