# CaveCanem
> [Beware the dog!](https://en.wiktionary.org/wiki/cave_canem) A Node.JS HTTP BA

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
## API

```js
var auth = require('cavecanem')
```

the `auth` needs to be placed as middleware in a routing environment.
Eg. if we have a resource "users" as a restricted resource you will place
the auth before the route for this specific resource:

```js
app.use('/users', auth, users);
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

