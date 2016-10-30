"use strict";

const React = require("react");
const classNames = require("classnames");

class SoundSelector extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.sound !== nextProps.sound;
  }

  render() {
    const { resources, sound, onChange } = this.props;
    const elems = Object.keys(resources).map((name, i) => {
      const className = classNames({ selected: name === sound });
      const onClick = () => onChange(name);

      return (
        <li key={ i } className={ className } onClick={ onClick }>{ name }</li>
      );
    });

    return (
      <div className="sound-selector">
        <h2>sound.js</h2>
        <ul>{ elems }</ul>
      </div>
    );
  }
}

SoundSelector.propTypes = {
  resources: React.PropTypes.object.isRequired,
  sound    : React.PropTypes.string.isRequired,
  onChange : React.PropTypes.func.isRequired,
};

module.exports = SoundSelector;
