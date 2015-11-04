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
module.exports = function (selector, _opts) {
  var f = this,
      opts = _opts || { orientation: 'vertical' };
  this.selector = selector;

  /**
   *
   */
  this.draw = function (client, query) {
    if (Object.prototype.toString.call(query) === '[object Array]') {
      this._handleMultiQuery(client, query);
    } else {
      this._handleSingleQuery(client, query);
    }
  };

  this._handleMultiQuery = function (client, query) {
    client.run(query, function (err, response) {
      if (err) {
        console.log(err);
        return;
      }
      var i = 0,
          result = [];
      for(; i < query.length; i++) {
        result.push(response[i].result);
      }
      f._render(result);
    });
  };

  this._handleSingleQuery = function (client, query) {
    client.run(query, function (err, response) {
      if (err) {
        console.log(err);
        return;
      }
      f._render(response.result);
    });
  };

  this._render = function (data) {
    var i = 0,
      len = data.length,
      prop = (opts.orientation === 'vertical' ? 'width' : 'height');

    for(; i < len; i++) {
      var step = i + 1,
        v = data[i],
        el = $(f.selector).find('.funnel-step-' + step),
        // dm = max <= 0 ? 0 : 100 - (((max - v) / max) * 100).toFixed(0),
        isLast = step >= len,
        next = isLast ? 0 : data[step],
        dn = v - next,
        sr = ((dn / v).toFixed(4) * 100),
        dm = sr <= 0 ? 0 : (100 - sr).toFixed(0);

      el.find('.funnel-step-value').text(fmt.nFormat(v, 1));
      el.find('.funnel-step-bar').css(prop, (v > 0 && dm <= 0 ? 100 : dm) + '%');

      if (!isLast) {
        el.find('.funnel-step-ratio').text((100 - sr).toFixed(2) + '%');
        el.find('.funnel-step-churn-ratio').text(sr.toFixed(2) + '%');
      }
    }
  };
};
