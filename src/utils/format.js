'use strict';

var SI_EXPS = [{
  value: 1E18,
  symbol: 'E'
}, {
  value: 1E15,
  symbol: 'P'
}, {
  value: 1E12,
  symbol: 'T'
}, {
  value: 1E9,
  symbol: 'G'
}, {
  value: 1E6,
  symbol: 'M'
}, {
  value: 1E3,
  symbol: 'k'
}];

module.exports = {
  /**
  */
  asPercentage: function (num) {
    return parseFloat((num.toFixed(4) * 100).toFixed(2));
  },
  /**
  */
  nFormat: function (num, digits) {
    var i = 0,
      d = digits || 1,
      si = SI_EXPS,
      a = Math.abs(num);

    for (; i < si.length; i++) {
      if (a >= si[i].value) {
        return (num / si[i].value).toFixed(d).replace(/\.?0+$/, '') + si[i].symbol;
      }
    }
    return num;
  }
};
