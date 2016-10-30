"use strict";

class Browser {
  constructor(window, actions) {
    this.window = window;
    this.actions = actions;

    this.onhashchange = this.onhashchange.bind(this);
    this.window.onhashchange = this.onhashchange;

    setTimeout(() => this.applyLocationHash(), 0);
  }

  doAction() {}

  setState(nextState) {
    this.setLocationHash(nextState);
  }

  applyLocationHash() {
    const items = this.window.location.hash.slice(1).split("/");

    if (items.length === 1) {
      this.actions.selectSound(items[0]);
    }
    if (items.length === 2) {
      this.actions.selectSound(items[0]);
      this.actions.selectExample(items[1] - 1);
    }
  }

  setLocationHash(state) {
    let hash = "";

    if (state.example !== -1) {
      hash = `${ state.sound }/${ state.example + 1 }`;
    } else {
      hash = `${ state.sound }`;
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
