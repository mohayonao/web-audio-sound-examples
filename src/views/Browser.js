"use strict";

class Browser {
  constructor(window, actions) {
    this.window = window;
    this.actions = actions;

    this.onhashchange = this.onhashchange.bind(this);
    this.window.onhashchange = null;

    setTimeout(() => this.applyLocationHash(), 0);
  }

  doAction() {}

  setState(nextState) {
    if (this.window.onhashchange) {
      this.setLocationHash(nextState);
    }
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

    this.window.onhashchange = this.onhashchange;
  }

  setLocationHash(state) {
    let hash = "";

    if (state.exampleId !== -1) {
      hash = `${ state.soundName }/${ state.exampleId + 1 }`;
    } else {
      hash = `${ state.soundName }`;
    }

    this.window.onhashchange = null;
    this.window.location.hash = hash;
    setTimeout(() => this.window.onhashchange = this.onhashchange, 0);
  }

  onhashchange() {
    this.applyLocationHash();
  }
}

module.exports = Browser;
