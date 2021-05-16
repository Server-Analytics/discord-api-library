'use strict';

const Util = require('../util/Util');

/**
 * Represents a data model that is identifiable by a Snowflake (i.e. Discord API data models).
 * @abstract
 */
class Base {
  constructor(client) {
    /**
     * The client that instantiated this
     * @name Base#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'client', {
      value: client
    });
  }

  _clone() {
    return Object.assign(Object.create(this), this);
  }

  _patch(data) {
    return data;
  }

  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }

  toJSON(...props) {
    return Util.flatten(this, ...props);
  }

  valueOf() {
    return this.id;
  }

  convertIDtoUnix(id) {
    var bin = (+id).toString(2);
    var unixbin = '';
    var unix = '';
    var m = 64 - bin.length;
    unixbin = bin.substring(0, 42 - m);
    unix = parseInt(unixbin, 2) + 1420070400000;
    return unix;
  }
}

module.exports = Base;