'use strict';

var ZestCreator = require('../'),
    should      = require('should'),
    _           = require('lodash');

var opts = {
  title: 'my zest',
  description: 'a little zest script',
  client: 'test client',
  author: 'mocha'
};

var sampleLoopTokenRegexSet = {
  groupIndex: 0,
  caseExact: false,
  elementType: 'ZestLoopTokenRegexSet'
};


describe('Zest test 2', function () {
  var zc = new ZestCreator(opts);

  describe('create ZestLoopRegex', function () {
    it('should create ZestLoopRegex', function () {
      var regexSet = _.clone(sampleLoopTokenRegexSet);
      regexSet.inputVariableName = 'response.body';
      regexSet.variableName = 'q';
      regexSet.regex = 'html';
      zc.addStatement(regexSet);
      var stmt = zc.getStatement(1);
      stmt.set.should.have.properties({
        inputVariableName: 'response.body',
        regex: 'html',
        groupIndex: 0,
        caseExact: false,
        elementType: 'ZestLoopTokenRegexSet'
      });
      stmt.should.have.properties({
        statements: [],
        variableName: 'q',
        elementType: 'ZestLoopRegex',
        index: 1,
        enabled: true
      });
      zc.statementCount.should.be.exactly(1);
    });
  });
});
