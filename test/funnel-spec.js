/**
 * Caravelo Visual Business Intelligence Library
 * Funnel Spec
 */
'use strict'

require('./setup.js');

describe('Funnel Spec', function () {

  it('should render a funnel with proper ratios', function () {
    var kpi = new viz.Funnel('#fun');
    kpi._render([100, 75, 10, 5]);
    $('.funnel-step-1 .funnel-step-ratio').text().should.equal('75.00%');
    $('.funnel-step-1 .funnel-step-churn-ratio').text().should.equal('25.00%');
    $('.funnel-step-3 .funnel-step-ratio').text().should.equal('50.00%');
  });

});
