/* global $ */
'use strict';

/**
 * Display Themes
 */
var Theme = {
  extend: function (theme) {
    return $.extend(true, this.Pure, theme);
  }
};

/**
 * Base theme
 */
Theme.Pure =  {
  templateAttr: 'data-kpi-template',
  sparkline: {
    config: {
      chart: {
        width: '100%',
        lineColor: '#474843',
        spotColor: '#474843',
        minSpotColor: '#C21A01',
        maxSpotColor: '#519548',
        highlightSpotColor: '#474843',
        highlightLineColor: '#B4BCBC',
        spotRadius: 2,
        fillColor: false
      }
    }
  },
  bullet: {
    config: {
      chart: {
        width: '100%',
        targetColor: '#256295',
        performanceColor: '#474843',
        rangeColors: ['#C5CFC6', '#9D9D93', '#7B7B71']
      }
    }
  },
  bars: {
    config: {
      chart: {
        barColor: '#474843',
        barWidth: 10,
        negBarColor: '#C21A01'
      }
    }
  },
  spin: { color:'#888', lines: 8 }
};

/**
 * Bootstrap friendly theme
 */
Theme.Bootstrap =  Theme.extend({
  sparkline: {
    config: {
      chart: {
        lineColor: '#222',
        spotColor: '#337AB7',
        minSpotColor: '#D9534F',
        maxSpotColor: '#5CB85C',
        highlightSpotColor: '#555',
        highlightLineColor: '#B4BCBC',
      }
    }
  } ,
  bullet: {
    config: {
      chart: {
        targetColor: '#337AB7',
        performanceColor: '#222',
        rangeColors: ['#EEE', '#FCF8E3', '#F2DEDE']
      }
    }
  },
  spin: { color:'#888', lines: 8 }
});

module.exports = Theme;
