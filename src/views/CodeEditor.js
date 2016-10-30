"use strict";

const CodeMirror = require("codemirror");
const resources = require("../resources");

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
    this._selected = null;
  }

  doAction(action) {
    switch (action.type) {
    case "RUN":
      return this.run();
    case "CLEAR":
      return this.clear();
    case "SELECT_SOUND":
      return this.selectSound(action.sound);
    case "SELECT_EXAMPLE":
      return this.selectExample(action.index);
    }
  }

  setState() {}

  run() {
    const sound = toFunction(this._sound.getValue());
    const example = toFunction(this._example.getValue());

    if (sound !== null && example !== null) {
      this.actions.execute(sound, example);
    }
  }

  clear() {
    this._selected = null;
    this._sound.setValue("");
    this._example.setValue("");
  }

  selectSound(sound) {
    if (!resources[sound]) {
      return this.clear();
    }
    this._selected = resources[sound];
    this._sound.setValue(this._selected.sound.toString());
    this._example.setValue("");
  }

  selectExample(index) {
    if (!this._selected) {
      return this._example.setValue("");
    }
    this._example.setValue((this._selected.examples[index] || "").toString());
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
