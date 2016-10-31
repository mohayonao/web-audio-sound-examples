"use strict";

class Browser {
  constructor(window, actions) {
    this.window = window;
    this.actions = actions;
    this.state = { exampleId: -1 };

    setTimeout(() => this.applyLocationHash(), 0);
  }

  doAction(action) {
    switch (action.type) {
    case "LINK":
      return this.link();
    }
  }

  setState(state) {
    this.state = state;
  }

  link() {
    this.setLocationHash(this.state);
  }

  applyLocationHash() {
    const items = this.window.location.hash.slice(1).split("/");

    if (items.length === 1) {
      this.actions.selectSoundName(items[0]);
    }
    if (items.length === 2) {
      this.actions.selectSoundName(items[0]);
      this.actions.selectExampleId(items[1] - 1);
    }
  }

  setLocationHash(state) {
    let hash = "";

    if (state.exampleId !== -1) {
      hash = `${ state.soundName }/${ state.exampleId + 1 }`;
    } else {
      hash = `${ state.soundName }`;
    }

    this.window.location.hash = hash;
  }
}

module.exports = Browser;
