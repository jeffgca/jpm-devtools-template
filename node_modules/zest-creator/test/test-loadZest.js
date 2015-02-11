'use strict';

var sampleZest  = require('../testData/sampleDataSet').sampleZest,
    should      = require('should'),
    ZestCreator = require('../');

var opts = {
  debug: false
};

describe('test loading a zest script as json', function () {
  var zc = new ZestCreator(opts, sampleZest);

  it('should load the given zest properly', function () {
    zc.script.title.should.be.exactly('my zest');
    zc.stmtIndex.should.be.exactly(32);
    zc.config.debug.should.be.exactly(false);
  });

  it('should get 1st statement', function () {
    zc.getStatement(1).should.have.properties({
      comment: 'A comment',
      elementType: 'ZestComment',
      index: 1,
      enabled: true
    });
  });

  it('should get next statement', function () {
    var aStmt = zc.getStatement(1);
    aStmt = zc.nextStatement(aStmt);
    aStmt.should.have.properties({
      comment: 'another one',
      elementType: 'ZestComment',
      index: 2,
      enabled: true
    });
  });

  it('add a new statement', function () {
    zc.addStatement({ comment: 'last stmt', elementType: 'ZestComment'});
    zc.stmtIndex.should.be.exactly(33);
    zc.getStatement(33).should.have.properties({
      comment: 'last stmt',
      elementType: 'ZestComment',
      index: 33,
      enabled: true
    });
  });
});

describe('test loading a zest file', function () {
  var zc = new ZestCreator({file: 'testData/sampleDataSet2.js'});

  it('should have correct attributes', function () {
    zc.script.title.should.be.exactly('my zest');
    zc.script.author.should.be.exactly('mocha');
    zc.stmtIndex.should.be.exactly(32);
 });

  it('should get 1st statement', function () {
    zc.getStatement(1).should.have.properties({
      comment: 'A comment',
      elementType: 'ZestComment',
      index: 1,
      enabled: true
    });
  });

  it('should get next statement', function () {
    var aStmt = zc.getStatement(1);
    aStmt = zc.nextStatement(aStmt);
    aStmt.should.have.properties({
      comment: 'another one',
      elementType: 'ZestComment',
      index: 2,
      enabled: true
    });
  });

  it('add a new statement', function () {
    zc.addStatement({ comment: 'last stmt', elementType: 'ZestComment'});
    zc.stmtIndex.should.be.exactly(33);
    zc.getStatement(33).should.have.properties({
      comment: 'last stmt',
      elementType: 'ZestComment',
      index: 33,
      enabled: true
    });
  });

});
