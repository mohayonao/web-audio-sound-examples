"use strict";

const React = require("react");
const classNames = require("classnames");

class MasterCtrl extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.preview !== nextProps.preview || this.props.exampleId !== nextProps.exampleId;
  }

  render() {
    const { preview, exampleId, onClick } = this.props;
    const runClassName  = classNames("btn", { "btn-run" : exampleId !== -1 });
    const stopClassName = classNames("btn", { "btn-stop": preview });

    return (
      <div className="master-ctrl">
        <h2>preview</h2>
        <div>
          <button className={ runClassName } onClick={ ()=> onClick("run") }>Run</button>
          <button className={ stopClassName } onClick={ ()=> onClick("stop") }>Stop</button>
          <button className="btn" onClick={ ()=> onClick("clear") }>Clear</button>
        </div>
      </div>
    );
  }
}

MasterCtrl.propTypes = {
  preview  : React.PropTypes.bool.isRequired,
  exampleId: React.PropTypes.number.isRequired,
  onClick  : React.PropTypes.func.isRequired,
};

module.exports = MasterCtrl;
