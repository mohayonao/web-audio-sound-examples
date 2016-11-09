"use strict";

const React = require("react");

const COLOR_L = "#3aff8c";
const COLOR_R = "#e51502";

class AnalyserView extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      mode: "timeDomain",
    };
    this.changeMode = this.changeMode.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.analysedData !== nextProps.analysedData ||
      this.state.mode !== nextState.mode;
  }

  changeMode() {
    if (this.state.mode === "timeDomain") {
      this.setState({ mode: "frequency" });
    } else {
      this.setState({ mode: "timeDomain" });
    }
  }

  render() {
    const { analysedData } = this.props;
    const view = this.state.mode === "timeDomain" ?
      this.renderTimeDomain(analysedData) : this.renderFrequency(analysedData);

    return (
      <svg className="analyser-view" viewBox="0 0 226 90" onClick={ this.changeMode }>
        <g>{ view }</g>
      </svg>
    );
  }

  renderTimeDomain({ timeDomainL, timeDomainR }) {
    if (timeDomainL.length === 0) {
      return null;
    }

    let dL = "";
    let dR = "";

    for (let i = 0, imax = timeDomainL.length; i < imax; i++) {
      const x = (i / imax) * 226;
      const yL = linlin(timeDomainL[i], -0.4, 0.4, 90, 0);
      const yR = linlin(timeDomainR[i], -0.4, 0.4, 90, 0);

      dL += `${ i === 0 ? "M" : "L"} ${ x } ${ yL } `;
      dR += `${ i === 0 ? "M" : "L"} ${ x } ${ yR } `;
    }

    return [
      <path key={ 0 } d={ dL } strokeWidth={ 1 } stroke={ COLOR_L } fill="transparent" opacity={ 0.5 }/>,
      <path key={ 1 } d={ dR } strokeWidth={ 1 } stroke={ COLOR_R } fill="transparent" opacity={ 0.5 }/>,
    ];
  }

  renderFrequency({ frequencyL, frequencyR }) {
    if (frequencyL.length === 0) {
      return null;
    }

    let dL = "M 0 90 ";
    let dR = "M 0 90 ";

    for (let i = 0, imax = frequencyL.length; i < imax; i++) {
      const x = (i / imax) * 226;
      const yL = linlin(frequencyL[i], 0, -200, 0, 90);
      const yR = linlin(frequencyR[i], 0, -200, 0, 90);

      dL += `L ${ x } ${ yL } `;
      dR += `L ${ x } ${ yR } `;
    }
    dL += "L 226 90 z";
    dR += "L 226 90 z";

    return [
      <path key={ 0 } d={ dL } fill={ COLOR_L } opacity={ 0.5 }/>,
      <path key={ 1 } d={ dR } fill={ COLOR_R } opacity={ 0.5 }/>,
    ];
  }
}

AnalyserView.propTypes = {
  analysedData: React.PropTypes.object.isRequired,
};

function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

module.exports = AnalyserView;
