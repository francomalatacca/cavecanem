# CaveCanem
> [Beware the dog!](https://en.wiktionary.org/wiki/cave_canem) A Node.JS HTTP _Basic Authentication_ library

[![Build Status](https://travis-ci.org/francomalatacca/cavecanem.svg?branch=master)](https://travis-ci.org/francomalatacca/cavecanem)

## HTTP Basic authentication (BA)

HTTP Basic authentication (BA) implementation is the simplest technique 
for enforcing access controls to web resources because it doesn't require cookies, 
session identifier and login pages. Rather, HTTP Basic authentication uses static, 
standard fields in the HTTP header which means that no handshakes have to be done in anticipation.
[Wikipedia](https://en.wikipedia.org/wiki/Basic_access_authentication)

## CaveCanem Installation

```js
$ npm install cavecanem
```

## Getting started

### Example with Express.js

```js
var auth = require('cavecanem')
```

_cavecanem_ includes a configuration object `cc` passed through the _req_ object.
The `cc` can specify a function named `checkCredentials` for testing the credentials
against hardcoded values in the simplest case or stored in a database.

The way to intercept the _req_ object and to add the `cc` object can be done in different way but 
the following is a good and simple approach:

```js
app.use(function (req, res, next) {
  req.authentication = {
    checkCredentials: function(credentials){
      return (credentials.username === "canem" && credentials.password === "cave");
    }
  };
  next();
});
```

you can use the `auth` variable as a middleware for the routing of yours _protected resource_

```js
app.use('/users', auth, protected_resource);
```

the function called by the route will receive the `res` object which will include `authentication` object with a code, a description and in case username and password.

|code|description|username|password|
|---|---|---|---|
|200|successfully authenticated|yes|yes|
|401|The username or password are wrong|no|no|
|400|Wrong authorization header is provided|no|no|
|500|Description of the error|no|no|

The end function needs to use this information to send back the correct status to the client.


#### Test with cURL

A simple way to test the the request to a _protected_resource_
```
curl -v --header "authorization: Basic Y2FuZW06Y2F2ZQ==" http://localhost:3000/protected_resource
```

## How it works

Get the basic auth credentials from the given request. 
The sender will add the `Authorization` header within the request. 
Suppose the username is `canem` and the password is `cave` then the Authorization
header will results `Basic Y2FuZW06Y2F2ZQ==`. This header is parsed and 
an object with `username` and `password` is returned in a successful scenario.

## License

[MIT License](http://opensource.org/licenses/MIT)
[npm-url]: https://npmjs.org/package/cavecanem

