"use strict";

const React = require("react");
const classNames = require("classnames");

class MasterCtrl extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.preview !== nextProps.preview;
  }

  render() {
    const { preview, onClick } = this.props;
    const stopClassName = classNames("btn", { "btn-stop": preview });

    return (
      <div className="master-ctrl">
        <h2>preview</h2>
        <div>
          <button className="btn btn-run" onClick={ ()=> onClick("run") }>Run</button>
          <button className={ stopClassName } onClick={ ()=> onClick("stop") }>Stop</button>
          <button className="btn" onClick={ ()=> onClick("clear") }>Clear</button>
          <button className="btn" onClick={ ()=> onClick("link") }>Link</button>
        </div>
      </div>
    );
  }
}

MasterCtrl.propTypes = {
  preview: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

module.exports = MasterCtrl;
