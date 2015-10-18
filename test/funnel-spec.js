/**
 * Caravelo Visual Business Intelligence Library
 * Funnel Spec
 */
'use strict'

require('./setup.js');

describe('Funnel Spec', function () {

  it('should render a funnel', function () {
    var kpi = new viz.Funnel('#fun');
    kpi._render([100, 50, 10, 5]);
    $('.funnel-step-4 .funnel-step-ratio').text().should.equal('50.00%');
  });

});
