'use strict';

var ZestCreator = require('../'),
    should      = require('should'),
    fs          = require('fs');

var opts = {
  title: 'my zest',
  description: 'a little zest script',
  client: 'test client',
  author: 'mocha'
};


describe('save zest', function () {
  var zc = new ZestCreator(opts);

  it('should save zest to a file without a given filename', function () {
    zc.saveToFile();
    fs.existsSync('newzest.zst').should.be.true;
    var data = fs.readFileSync('newzest.zst', 'utf8');
    var expected = JSON.stringify(zc.getZest(), undefined, 2);
    data.should.equal(expected);
  });

  it('should save zest to a given filename with .zst extension', function () {
    zc.saveToFile('foo.zst');
    fs.existsSync('foo.zst').should.be.true;
    var data = fs.readFileSync('foo.zst', 'utf8');
    var expected = JSON.stringify(zc.getZest(), undefined, 2);
    data.should.equal(expected);
  });

  it('should save zest to a given filename without .zst ext', function () {
    zc.saveToFile('baa');
    fs.existsSync('baa.zst').should.be.true;
    var data = fs.readFileSync('baa.zst', 'utf8');
    var expected = JSON.stringify(zc.getZest(), undefined, 2);
    data.should.equal(expected);
  });

  after(function () {
    fs.unlinkSync('newzest.zst');
    fs.unlinkSync('foo.zst');
    fs.unlinkSync('baa.zst');
  });
});
