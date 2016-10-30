"use strict";

const React = require("react");
const { connect } = require("react-redux");
const resources = require("../resources");
const MasterCtrl = require("../components/MasterCtrl");
const SoundSelector = require("../components/SoundSelector");
const ExampleSelector = require("../components/ExampleSelector");

class App extends React.Component {
  render() {
    const { actions } = this.props;
    const selectSound   = name  => actions.selectSound(name);
    const selectExample = index => actions.selectExample(index);
    const onClick = actionName => actions[actionName]();

    return (
      <div className="app-container">
        <MasterCtrl { ...this.props } onClick={ onClick }/>
        <SoundSelector { ...this.props } resources={ resources } onChange={ selectSound }/>
        <ExampleSelector { ...this.props } resources={ resources } onChange={ selectExample }/>
      </div>
    );
  }
}

App.propTypes = {
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
};

module.exports = connect(state => state)(App);
