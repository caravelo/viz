should = require('chai').should();
jsdom = require('jsdom').jsdom;
fs = require('fs');
document = jsdom(fs.readFileSync('./test/resources/test.html'));
window = document.defaultView;
jQuery = $ = require('jquery');
// TODO mock with sinon
$.fn.extend({
  sparkline: function(a, b) {
    // console.log(a, b);
}});
viz = require('../src/viz');
navigator = window.navigator = {};
DEBUG = false;
navigator.userAgent = 'NodeJs JsDom';
navigator.appVersion = '';
