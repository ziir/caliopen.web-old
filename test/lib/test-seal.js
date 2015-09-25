var path = require('path');
var fs = require('fs');

var expect = require('chai').expect;

var root = path.join(__dirname, '../..');
var app = path.join(root, 'app');
var fixtures = path.join(root, 'fixtures');

var sealUtil = require(path.join(app, 'lib', 'seal'));

var fixture = require(path.join(fixtures, 'login.json'));
var sealedFixturePath = path.join(fixtures, 'seal.txt');

var config = require(path.join(app, 'config'))('development');

describe('sealUtil', function () {
  describe('#encode() + #decode()', function () {
    it('should encode the fixture without error', function (done) {
      sealUtil.encode(fixture, config.cookie.secret, function(err, seal) {
        expect(err).to.equal(null);
        expect(seal).to.not.equal(null);
        fs.writeFileSync(sealedFixturePath, seal);
        done();
      });
    });

    it('should decode the fixture without error', function (done) {
      var sealedFixture = fs.readFileSync(sealedFixturePath)+'';
      sealUtil.decode(sealedFixture, config.cookie.secret, function(err, obj) {
        expect(err).to.equal(null);
        expect(obj).to.deep.equal(fixture);
        done();
      });
    });
  });
});
