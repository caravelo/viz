/**
 * Caravelo Visual Business Intelligence Library
 * Format Spec
 */
'use strict';

var fmt = require('../src/utils/format.js');

describe('Format Spec', function () {

  it('should print 10k units', function () {
    fmt.nFormat(10000).should.equal('10k');
  });
  it('should print -10k units', function () {
    fmt.nFormat(-10000).should.equal('-10k');
  });
  it('should print 15.52k units', function () {
    fmt.nFormat(15520, 2).should.equal('15.52k');
  });
  it('should print 1.5M units', function () {
    fmt.nFormat(1500000).should.equal('1.5M');
  });
  it('should print 1.5G units', function () {
    fmt.nFormat(1500000001).should.equal('1.5G');
  });
  it('should print 10', function () {
    fmt.nFormat(10).should.equal('10');
  });
  it('should print 10.5', function () {
    fmt.nFormat(10.55).should.equal('10.6');
  });
  it('should be 101', function () {
    fmt.asPercentage(1.01).should.equal(101);
  });
  it('should be 101%', function () {
    fmt.nPercent(1.01).should.equal('101%');
  });
  it('should be 11', function () {
    fmt.asPercentage(0.11).should.equal(11.00);
  });
  it('should be 1', function () {
    fmt.asPercentage(0.01).should.equal(1.00);
  });
  it('should be -201', function () {
    fmt.asPercentage(-2.01).should.equal(-201);
  });
  it('should be 0.01', function () {
    fmt.asPercentage(0.0001).should.equal(0.01);
  });
  it('should be -0.01', function () {
    fmt.asPercentage(-0.0001).should.equal(-0.01);
  });
  it('should be 0', function () {
    fmt.asPercentage(0.00000001).should.equal(0);
  });

});
