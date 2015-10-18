'use strict';

/**
 * Countdown latch barrier.
 * Helper object to wait during data retrieval.
 *
 * @param {Number} initialLimit - countdown initial limit.
 * @param {Datum} datum - a Datum instance.
 */
module.exports = function (initialLimit, datum) {
  var count = 0;
  this.limit = initialLimit;
  this.countDown = function () {
    count++;
    if (this.limit <= count) { datum.onReady(); }
    console.log('Count', count, 'of', this.limit);
  };
};
