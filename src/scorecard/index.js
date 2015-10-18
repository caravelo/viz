/* global $ */
'use strict';

var UI = require('./ui.js'),
      Datum = require('./datum.js'),
      Theme = require('../themes');

/**
 * Scorecard Component.
 * Displays state indicators and provides visual feedback linked to a set of KPIs. 
 *
 * Example of usage:
 * var card = new Scorecard('#some-selector');
 * card.draw([{ 
 *   name: 'Metric 1',
 *   client: keenClient,
 *   query: keenQuery,
 *   meta: { bullet: { target: 1000 } }
 * },{
 *   name: 'Metric 2',
 *   client: keenClient,
 *   query: keenQuery
 * }]);
 *
 * @param {String} id - Selector for the target element.
 * @param {Object} opts - Options object. Allows to configure UI components.
 * @see http://omnipotent.net/jquery.sparkline/ for documentation regarding the available chart options.
 */
function Scorecard(id, opts) {

  // Option overrides
  this.opts = $.extend(true, Theme.Pure, opts);
  this.id = id;

  var sc = this,
    o = this.opts;

  this.components = [
    new UI.Title(o.title),
    new UI.Value(o.value),
    new UI.Delta(o.delat),
    new UI.Sum(o.sum),
    new UI.Bars(o.bars),
    new UI.Sparkline(o.sparkline),
    new UI.Bullet(o.bullet)
  ];

  this.datum = new Datum(function () {
    sc._render();
    sc._afterDraw();
  });
  this._afterDraw = function () {};

}

Scorecard.version = '__VERSION__';

/**
 * Renders the elements for the underlying datum and the registered components.
 *
 * Expected parameters structure:
 *  [{ name: 'Metric name',              // metric name
 *     client: keen_client,              // an instance of Keen client
 *     query: keen_query,                // an instance of KeenQuery
 *     meta: { bullet: { target: 10 } }  // components meta-data
 *  },{ name: ...                        // N objects... more 
 *     ...
 *  }]
 *
 * @param {Object} params - The parameters structure.
 * @param {Function} afterDraw (optional) - Function that will be called after rendering.
 */
Scorecard.prototype.draw = function (params, afterDraw) {
  var p = (Object.prototype.toString.call(params) === '[object Array]') ? params : [params],
        sc = this;

  // Register an after draw callback
  this._afterDraw = afterDraw || this._afterDraw;

  // Sets the expected number of acks
  this.datum.waitFor(p.length);

  $.each(p, function (i, v) {
    if (v.query.params.group_by) {
      sc._handleGroupQuery(v.client, v.query);
    } else {
      sc._handleQuery(v);
    }
  });
};

Scorecard.prototype._render = function () {
  var index = 0,
    root = $(this.id),
    template = this._findTemplate(root),
    datum = this.datum,
    idName = root.attr('id') || this.id.substring(1);

  for (var key in datum.holder) {
    var ctx = {
        key: key,
        datum: datum,
        rows: datum.rows(key),
        meta: datum.meta(key),
        length: datum.length(key),
        sum: datum.sum(key)
      },
      _el = template.clone();

    _el.removeAttr(this.opts.templateAttr);
    _el.attr('id', idName + '-' + index);

    root.append(_el);

    for (var i = 0; i < this.components.length; i++) {
      var c = this.components[i];
      if (c.accepts(_el)) { c.render(ctx); }
    }

    index++;
  }

  template.remove();
};

Scorecard.prototype._findTemplate = function (el) {
  var attr = this.opts.templateAttr,
    tmpl = el.find('[' + attr + ']');
  if (tmpl.length > 0) {
    return tmpl;
  } else {
    throw new Error('Template not found.' + "Please, add a child element with a '" + attr + "' attribute.");
  }
};

Scorecard.prototype._handleGroupQuery = function (client, query) {
  if (query.params.group_by.constructor === Array) {
    throw new Error('Multiple group by properties not yet supported.');
  }

  var groupKey = query.params.group_by,
    dat = this.datum;

  var handler = function (err, response) {
    if (err) {
      console.log(err);
      return;
    }

    $.each(response.result, function () {
      if (this.timeframe === undefined) {
        throw new Error('The result is not a time serie. Please, specify timeframe and interval.');
      }

      $.each(this.value, function () {
        if (dat.lacks(this[groupKey])) {
          dat.register(this[groupKey]);
        }
        dat.push(this[groupKey], this.result);
      });
    });

    dat.ack();
  };

  client.run(query, handler);
};

Scorecard.prototype._handleQuery = function (p) {
  var query = p.query,
    name = p.name,
    client = p.client,
    meta = p.meta,
    dat = this.datum;

  dat.register(name, meta);

  client.run(query, function (err, response) {
    if (err) {
      console.log(err);
      return;
    }

    $.each(response.result, function (i, r) {
      dat.push(name, r.value);
    });

    dat.ack();
  });
};

module.exports = Scorecard;
