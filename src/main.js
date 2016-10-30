"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const { createStore, applyMiddleware, bindActionCreators } = require("redux");
const inject = require("./inject");
const actionCreators = require("./actions");
const reducers = require("./reducers");
const App = require("./views/App");
const Browser = require("./views/Browser");
const CodeEditor = require("./views/CodeEditor");
const SoundPreview = require("./views/SoundPreview");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducers, applyMiddleware(inject(actionHandler)));
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const browser = new Browser(global, actions);
  const editor = new CodeEditor(document, actions);
  const preview = new SoundPreview(new AudioContext(), actions);
  const initState = store.getState();

  browser.setState(initState);
  editor.setState(initState);
  preview.setState(initState);

  function actionHandler(action) {
    browser.doAction(action);
    editor.doAction(action);
    preview.doAction(action);
  }

  store.subscribe(() => {
    const nextState = store.getState();

    browser.setState(nextState);
    editor.setState(nextState);
    preview.setState(nextState);
  });

  ReactDOM.render(
    <Provider store={ store }>
      <App actions={ actions }/>
    </Provider>
  , document.getElementById("app"));
});
