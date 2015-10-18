/**
 * Caravelo Visual Business Intelligence Library
 * Scorecard Spec
 */
'use strict'

require('./setup.js');

describe('Scorecard Spec', function () {

  it('should find the template elemenet by data attribute', function () {
    var t = new viz.Scorecard()._findTemplate($('#01'));
    t[0].innerHTML.should.equal('Hi');
  });

  it('should throw an expception when the template is not found', function () {
    should.Throw(function () {
      new viz.Scorecard()._findTemplate($('#02'));
    }, Error);
  });

  it('should render two KPI titles', function () {
    var sc = new viz.Scorecard('#d01');
    sc.datum.holder = {
      a: {
        rows: [1, 2, 3],
        meta: {}
      },
      b: {
        rows: [4, 5, 6],
        meta: {}
      },
    };
    sc._render();
    $('#d01-1').should.have.length(1);
  });

});
