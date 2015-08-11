var expect = require("expect.js");
var caveCanem = require('../index');

describe('authentication', function() {
  it('checks the authorization string', function (done) {
    var req = {
      header: function (name) {
        // "authorization":"Basic Y2FuZW06Y2F2ZQ=="
        console.log('Requested header', name);
        return "Basic Y2FuZXo6Y2F2ZQ==";
      }
    };

    var res = {
      send: function (status, obj) {
        console.log(status, obj);
      }
    };
    req.cc = {};
    req.cc.checkCredentials = function(credentials) {
      console.log(credentials.username);
      return true;
    };

    caveCanem(req, res, function (req, res) {
      expect(req.cc.credentials).not.to.be(undefined);
      expect(req.cc.credentials.username).to.be("canez");
      expect(req.cc.credentials.password).to.be("cave");
      done();
    });
  });
  it('checks the authorization string failing', function (done) {
    var req = {
      header: function (name) {
        // "authorization":"Basic Y2FuZW06Y2F2ZQ=="
        console.log('Requested header', name);
        return "Basic";
      }
    };

    var res = {
      send: function (status, obj) {
        expect(status).to.be(401);
        done();
      }
    };
    req.cc = {};
    req.cc.checkCredentials = function(credentials) {
      console.log(credentials.username);
      return true;
    };
    caveCanem(req, res, function (req, res) {});
  });
  it('checks the req.cc.checkCredentials override function', function (done) {
    var req = {
      header: function (name) {
        // "authorization":"Basic Y2FuZW06Y2F2ZQ=="
        console.log('Requested header', name);
        return "Basic Y2FuZXo6Y2F2ZQ==";
      }
    };

    var res = {
      send: function (status, obj) {
        console.log(status, obj);
        done();
      }
    };
    req.cc = {};
    req.cc.checkCredentials = function(credentials) {
      console.log(credentials.username);
      return false;
    };
    caveCanem(req, res, function (req, res) {
    });
  });
});

