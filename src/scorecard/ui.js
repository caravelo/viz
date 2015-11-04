/* global $ */
'use strict';

/*
   UI Components
   ------------------------------------------------------------------------------*/
var fmt = require('../utils/format.js'),
 extend = require('../utils/extend.js'),
 UI = {};

/**
 * Base UI component.
 */
UI.Component = function () {};
UI.Component.prototype = {
 el: null,
 selector: null,
 config: null,
 init: function (opts, defaults) {
   var tmp = $.extend(true, defaults, opts || {});
   this.selector = tmp.selector;
   this.config = tmp.config;
 },
 accepts: function (root) {
   var _tmp = root.find(this.selector);
   if (_tmp.length > 0) {
     this.el = _tmp;
     return true;
   }
   return false;
 },
 text: function (content) {
   this.el.text(content);
 },
 addClass: function (className) {
   this.el.addClass(className);
 },
 sparkline: function (data, opts) {
   this.el.sparkline(data, opts);
 }
};

/**
 * Title component.
 */
UI.Title = function (opts) {
 this.init(opts, {
   selector: '.kpi-title'
 });
 this.render = function (ctx) {
   this.text(ctx.key);
 };
};
extend(UI.Title, UI.Component);

/**
 * Value component.
 */
UI.Value = function (opts) {
 this.init(opts, {
   selector: '.kpi-last-value'
 });
 this.render = function (ctx) {
   var lval = ctx.rows[ctx.length - 1];
   if (typeof ctx.meta.valueFmt === 'function') {
    this.text(ctx.meta.valueFmt(lval, fmt.nFormat));
   } else if (ctx.meta.ratios) {
    this.text(fmt.nPercent(lval));
   } else {
    this.text(fmt.nFormat(lval));
   }
 };
};
extend(UI.Value, UI.Component);

/**
 * Sum component.
 */
UI.Sum = function (opts) {
 this.init(opts, {
   selector: '.kpi-sum'
 });
 this.render = function (ctx) {
   if (typeof ctx.meta.valueFmt === 'function') {
    this.text(ctx.meta.valueFmt(ctx.sum, fmt.nFormat));
   } else if (ctx.meta.ratios) {
    this.text(fmt.nPercent(ctx.sum / ctx.length));
   } else {
    this.text(fmt.nFormat(ctx.sum));
   }
 };
};
extend(UI.Sum, UI.Component);

/**
 * Delta component.
 */
// TODO check float comparison
UI.Delta = function (opts) {
 this.init(opts, {
   selector: '.kpi-delta'
 });
 this.render = function (ctx) {
   if (ctx.rows.length < 2) {
     this.text('-');
     return;
   }

   var rows = ctx.rows,
     lastValue = rows[rows.length - 1],
     lastLast = rows[rows.length - 2],
     d = rows.length < 2 ? 0 : lastValue - lastLast,
     dc = 'delta-' + (d < 0 ? 'neg' : d === 0 ? 'none' : 'pos'),
     diff = (lastLast === 0 ? (d / 100) : (d / lastLast));
   this.addClass(dc);
   this.text(fmt.nPercent(diff));
 };
};
extend(UI.Delta, UI.Component);

/**
 * Sparkline component.
 */
UI.Sparkline = function (opts) {
 this.init(opts, {
   selector: '.kpi-sparkline'
 });
 this.render = function (ctx) {
   this.sparkline(ctx.rows, this.config.chart);
 };
};
extend(UI.Sparkline, UI.Component);

/**
 * Bars component.
 */
UI.Bars = function (opts) {
 this.init(opts, {
   selector: '.kpi-bars',
   config: {
     chart: {
       type: 'bar'
     }
   }
 });
 this.render = function (ctx) {
   this.sparkline(ctx.rows, this.config.chart);
 };
};
extend(UI.Bars, UI.Component);

/**
 * Bullet graph component.
 */
UI.Bullet = function (opts) {
 this.init(opts, {
   selector: '.kpi-bullet',
   config: {
     chart: {
       type: 'bullet'
     }
   }
 });
 this.render = function (ctx) {
   var t = this.el.parent().find(this.selector + '-value'),
     c = $.extend({
       ranges: [200, 100, 50],
       targetPct: 100,
       target: 1000
     }, ctx.meta.bullet || {}),
     v = fmt.asPercentage(ctx.sum / c.target);

   v = (v < 0 ? 0 : v);
   this.sparkline([c.targetPct, v, c.ranges[0], c.ranges[1], c.ranges[2]], this.config.chart);
   // TODO clean this
   if (t.length > 0) {
     t[0].innerHTML = v +
       ' <span class="kpi-bullet-desc">[' + fmt.nFormat(ctx.sum, 1) +
       '/' + fmt.nFormat(c.target, 1) + ']</span>';
   }
 };
};
extend(UI.Bullet, UI.Component);

module.exports = UI;
