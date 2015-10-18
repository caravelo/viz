'use strict';

/**
 * Simple inheritance helper.
 * Creates a new constructor function, whose prototype is the parent object's prototype.
 * Sets the child's prototype to the newly created constructor.
 *
 * @param {Object} child
 * @param {Object} parent
 */
module.exports = function (child, parent) {
  var T = function () {};
  T.prototype = parent.prototype;
  child.prototype = new T();
  child.prototype.constructor = child;
};
