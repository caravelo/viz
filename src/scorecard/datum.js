/* global $ */
'use strict';

/**
 * Convenience data wrapper.
 *
 * @param {Function} onReady - Function to be called when data is available.
 */
module.exports = function (onReady) {
  var Latch = require('../utils/latch.js'),
        barrier  = new Latch(0, this);

  this.holder = {};
  this.onReady = onReady;
  this.afterDraw = function () {};

  this.register = function (collection, meta) {
    this.holder[collection] = {
      rows: [],
      meta: meta || {}
    };
  };
  this.waitFor = function (limit) {
    barrier.limit = limit;
    console.log('Waiting for', limit, 'acks...');
  };
  this.ack = function () {
    barrier.countDown();
  };
  this.lacks = function (collection) {
    return this.holder[collection] === undefined;
  };
  this.has = function (collection) {
    return !this.lacks(collection);
  };
  this.push = function (collection, row) {
    this.rows(collection).push(row);
  };
  this.rows = function (collection) {
    return this.holder[collection].rows;
  };
  this.meta = function (collection) {
    return this.holder[collection].meta;
  };
  this.length = function (collection) {
    return this.rows(collection).length;
  };
  this.sum = function (collection) {
    var sum = 0;
    $.each(this.rows(collection), function () {
      sum += parseFloat(this) || 0;
    });
    return sum;
  };
};
