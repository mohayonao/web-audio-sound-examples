"use strict";

const React = require("react");
const classNames = require("classnames");

class SoundSelector extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.soundName !== nextProps.soundName;
  }

  render() {
    const { examples, soundName, onChange } = this.props;
    const elems = Object.keys(examples).map((name, i) => {
      const className = classNames({ selected: name === soundName });
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
  examples : React.PropTypes.object.isRequired,
  soundName: React.PropTypes.string.isRequired,
  onChange : React.PropTypes.func.isRequired,
};

module.exports = SoundSelector;
