/**
 * caveCanem a basic authorization http library
 * Copyright(c) 2015 Franco Malatacca
 * GPL v2 Licensed
 */

'use strict';

function atob(authorization) {
  return new Buffer(authorization, 'base64').toString('binary');
}

/**
 * Extracts the raw authorization string and returns an
 * object containing username and password fields.
 * @param authorizationString
 * @returns {{username: *, password: *}}
 */
var extractCredentialsFromHeader = function (authorizationString) {
  var authorization = authorizationString.split(' ');
  var username = null;
  var password = null;
  if (authorization.length > 0) {
    authorization = authorizationString.split(' ')[1];
    authorization = atob(authorization);
    username = authorization.split(':')[0];
    password = authorization.split(':')[1];
  } else {
    throw new Error("Bad authentication format");
  }
  return {username: username, password: password};
};

/**
 *
 * @param authenticationString
 * @returns {boolean}
 */
var checkAuthenticationString = function(authenticationString) {
  return (/Basic ([A-Za-z_\d]{18,22})+g/).test(authenticationString);
};

/**
 *
 * @param user
 * @param resource
 * @param acl
 * @param fn
 * @returns {*}
 */
var checkAuthorization = function(user, resource, acl, fn) {
  return fn(user, resource, acl);
};

/**
 * @param req - Basic Authentication: req.cc is the basic object for the configuration of authorization process.
 *    Authentication process
 *    - req.cc.checkCredentials
 *      this function need to be defined in order to check the credentials
 *      @param credentials - an object with username and password fields
 *      @returns - a boolean value: true/false.
 *
 *    Authorization process (optional, if the req.cc.acl object is configured):
 *    - req.cc.acl.config: access control list object with user/resource/access level configuration
 *    - req.cc.acl.fn: access control list function returns true/false based on the user, resource, config parameters
 * @param res - res object with req.cc.credentials if the user is enabled to access the resource.
 * @param next - callback function to route for the protected resource
 * @returns - 401 if the authentication fails.
 */
var authentication = function (req, res, next) {
  var authorizationString = req.header('authorization');
  if (authorizationString && checkAuthenticationString(authorizationString)) {
    try {
      var credentials = extractCredentialsFromHeader(authorizationString);
      if(req.cc && req.cc.acl){
        /* ToBe done
        var acl = req.cc.acl.config;
        var fn = req.cc.acl.fn;
        var extractResourceNameFromUrl = req.cc.extractResourceNameFromURL || extractResourceNameFromURL;
        if(typeof extractResourceNameFromURL === 'function' && req._parsedUrl.pathname && extractResourceNameFromURL && checkAuthorization) {
          var resource = req.extractResourceNameFromURL(req._parsedUrl.pathname);
          if(checkAuthorization(req.cc.user, resource)){
            return next(req, res);
          }else{
            res.send(401, {
              'Description': req.cc.user + ' can\'t access to ' + resource + ' resource'
            });
          }
        }
        */
      }else{
        var isAuthenticated = req.cc.checkCredentials(credentials);
        if(isAuthenticated) {
          req.cc.credentials = credentials;
          return next(req,res);
        }else{
          res.send(401, {'Description': 'The username or password are wrong'});
        }
      }

    } catch (ex) {
      res.send(401, {'Description': 'Error in authorization header'});
    }
  } else {
    res.send(401, {'Description': 'No authorization header is provided'});
  }
  return next(req, res);
};

/**
 * Extract the resource's name
 * if the resource's URI ends with the resource name
 * or with the identifies
 * (http|https)://domain/resource/(:id)
 * @private
 */
var extractResourceNameFromURL = function (url) {
  var pathBreakdown = url.split('/');
  var resourceName = pathBreakdown[pathBreakdown.length - 1];
  return resourceName;
};

/**
 * Module exports.
 * @public
 */

module.exports = authentication;
