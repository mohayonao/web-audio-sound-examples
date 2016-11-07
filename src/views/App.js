"use strict";

const React = require("react");
const { connect } = require("react-redux");
const examples = require("../examples");
const AnalyserView = require("../components/AnalyserView");
const MasterCtrl = require("../components/MasterCtrl");
const SoundSelector = require("../components/SoundSelector");
const ExampleSelector = require("../components/ExampleSelector");

class App extends React.Component {
  render() {
    const { actions } = this.props;
    const selectSoundName = name  => actions.selectSoundName(name);
    const selectExampleId = index => actions.selectExampleId(index);
    const onClick = actionName => actions[actionName]();

    return (
      <div className="app-container">
        <AnalyserView { ...this.props }/>
        <MasterCtrl { ...this.props } onClick={ onClick }/>
        <SoundSelector { ...this.props } examples={ examples } onChange={ selectSoundName }/>
        <ExampleSelector { ...this.props } examples={ examples } onChange={ selectExampleId }/>
      </div>
    );
  }
}

App.propTypes = {
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
};

module.exports = connect(state => state)(App);
