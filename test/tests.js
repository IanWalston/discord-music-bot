var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

var timer = require('../commands/timer.js')

describe('timer command', () => {
  it('should have a run method', () => {
    (typeof timer.run).should.equal('function')
  })
})
