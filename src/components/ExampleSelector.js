"use strict";

const React = require("react");
const classNames = require("classnames");

class ExampleSelector extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.sound !== nextProps.sound || this.props.example !== nextProps.example;
  }

  render() {
    const { resources, sound, example, onChange } = this.props;
    const selected = resources[sound];

    if (!selected) {
      return null;
    }

    const elems = selected.examples.map((fn, i) => {
      const className = classNames({ selected: i === example });
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
  resources: React.PropTypes.object.isRequired,
  sound    : React.PropTypes.string.isRequired,
  example  : React.PropTypes.number.isRequired,
  onChange : React.PropTypes.func.isRequired,
};

module.exports = ExampleSelector;
