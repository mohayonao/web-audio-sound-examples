"use strict";

const React = require("react");

class AnalyserView extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.timeDomainData !== nextProps.timeDomainData;
  }

  render() {
    const { timeDomainData } = this.props;
    let line = null;

    if (timeDomainData.length !== 0) {
      let d = "";

      for (let i = 0, imax = timeDomainData.length; i < imax; i++) {
        const x = (i / imax) * 100;
        const y = linlin(timeDomainData[i], -0.4, 0.4, 100, 0);

        d += `${ i === 0 ? "M" : "L"} ${ x } ${ y } `;
      }

      line = (<path d={ d } fill="transparent" strokeWidth={ 1 } stroke="#f1c40f"/>);
    }

    return (
      <svg className="analyser-view" viewBox="0 0 100 100" preserveAspectRatio="none">{ line }</svg>
    );
  }
}

AnalyserView.propTypes = {
  timeDomainData: React.PropTypes.any.isRequired,
};

function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

module.exports = AnalyserView;
