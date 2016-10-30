"use strict";

const _setInterval   = global.setInterval;
const _setTimeout    = global.setTimeout;
const _clearInterval = global.clearInterval;
const _clearTimeout  = global.clearTimeout;
const _timerIds = [];

function setInterval() {
  const timerId = _setInterval(...arguments);

  _timerIds.push(timerId);

  return timerId;
}

function setTimeout() {
  const timerId = _setTimeout(...arguments);

  _timerIds.push(timerId);

  return timerId;
}

function clearInterval(timerId) {
  const index = _timerIds.indexOf(timerId);

  if (index !== -1) {
    _timerIds.splice(index, 1);
  }

  return _clearInterval(timerId);
}

function clearTimeout(timerId) {
  const index = _timerIds.indexOf(timerId);

  if (index !== -1) {
    _timerIds.splice(index, 1);
  }

  return _clearTimeout(timerId);
}

function clearAllTimer() {
  _timerIds.splice(0).forEach((timerId) => {
    _clearInterval(timerId);
    _clearTimeout(timerId);
  });
}

global.setInterval   = setInterval;
global.setTimeout    = setTimeout;
global.clearInterval = clearInterval;
global.clearTimeout  = clearTimeout;

module.exports = {
  setInterval, setTimeout, clearInterval, clearTimeout, clearAllTimer,
};
