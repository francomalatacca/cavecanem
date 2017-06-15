var expect = require("expect.js");
var caveCanem = require('../index');

describe('authentication', function() {
  it('checks the authorization string', function (done) {
    var req = {
      header: function (name) {
        return "Basic Y2FuZXo6Y2F2ZQ==";
      }
    };
    var res = {
      send: function (status, obj) {
        console.log(status, obj);
        done();
      }
    };
    req.authentication = {};
    req.authentication.checkCredentials = function(credentials) {
      return true;
    };

    caveCanem(req, res, function (req, res) {
      console.log(req)
      expect(req).not.to.be(undefined);
      expect(req.authentication).not.to.be(undefined);
      expect(req.authentication.username).to.be("canez");
      expect(req.authentication.password).to.be("cave");
      done();
    });
  });

  it('checks the authorization string fails', function (done) {
    var req = {
      header: function (name) {
        // "authorization":"Basic Y2FuZW06Y2F2ZQ=="
        console.log('Requested header', name);
        return "Basic";
      }
    };

    var res = {
      send: function (status, obj) {
        console.log(status, log);
      }
    };
    req.authentication = {};
    req.authentication.checkCredentials = function(credentials) {
      console.log("req.authentication.checkCredentials", credentials.username);
      return false;
    };
    caveCanem(req, res, function (req, res) {
      expect(res.authentication).not.to.be(undefined);
      expect(res.authentication.code).not.to.be(200);
      done();
    });
  });

});

