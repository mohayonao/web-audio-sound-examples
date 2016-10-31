"use strict";

const React = require("react");
const classNames = require("classnames");

class ExampleSelector extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.soundName !== nextProps.soundName || this.props.exampleId !== nextProps.exampleId;
  }

  render() {
    const { examples, soundName, exampleId, onChange } = this.props;
    const selected = examples[soundName];

    if (!selected) {
      return null;
    }

    const elems = selected.examples.map((fn, i) => {
      const className = classNames({ selected: i === exampleId });
      const onClick = () => onChange(i);

      return (
        <li key={ i } className={ className } onClick={ onClick }>{ fn.name }</li>
      );
    });

    return (
      <div className="example-selector">
        <h2>example.js</h2>
        <ul>{ elems }</ul>
      </div>
    );
  }
}

ExampleSelector.propTypes = {
  examples : React.PropTypes.object.isRequired,
  soundName: React.PropTypes.string.isRequired,
  exampleId: React.PropTypes.number.isRequired,
  onChange : React.PropTypes.func.isRequired,
};

module.exports = ExampleSelector;
