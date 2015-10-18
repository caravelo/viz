/* global $ */
'use strict';

var fmt = require('../utils/format.js');

/**
 * Simple funnel.
 * TODO use data attributes (insted of css) for steps
 * Usage:
 *
 * @param {String} selector
 */
module.exports = function (selector) {
  var f = this;
  this.selector = selector;

  /**
   *
   */
  this.draw = function (client, funnel) {
    client.run(funnel, function (err, response) {
      if (err) {
        console.log(err);
        return;
      }
      f._render(response.result);
    });
  };

  this._render = function (data) {
    var max = data[0],
      last = 0;
    $.each(data, function (i, v) {
      var step = i + 1,
        el = $(f.selector).find('.funnel-step-' + step),
        dm = max <= 0 ? 0 : 100 - (((max - v) / max) * 100).toFixed(0),
        dl = last - v;

      el.find('.funnel-step-value').text(fmt.nFormat(v, 1));
      el.find('.funnel-step-bar').css('width', (v > 0 && dm <= 0 ? 1 : dm) + '%');
      if (dl >= 0) {
        el.find('.funnel-step-ratio').text((100 - ((dl / last).toFixed(4) * 100)).toFixed(2) + '%');
      }

      last = v;
    });
  };
};
