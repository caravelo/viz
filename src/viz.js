/*
 * Viz module definition.
 */
(function (factory) {
  'use strict';

  // RequireJS
  if (typeof define === 'function' && define.amd) {
    define('viz', [], factory);
  }

  // CommonJS
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  }

  // Browser globals
  var root = null;
  if (typeof window !== 'undefined') {
    root = window;
  } else if (typeof global !== 'undefined') {
    root = global;
  } else if (typeof self !== 'undefined') {
    root = self;
  }
  if (root) {
    root.Viz = factory();
  }

}(function () {
  'use strict';

  var Viz = {
    Theme: require('./themes'),
    Scorecard: require('./scorecard'),
    Funnel: require('./funnel')
  };

  module.exports = Viz;
  return Viz;
}));
