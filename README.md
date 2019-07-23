# nanoption

Tiny (220 bytes), zero dependency wrapper for nullable values.

## TL;DR

```js
// With nanoption
import { Option } from 'nanoption'

function getJwtToken(executionContext) {
  const jwtToken = Option.of(executionContext)
    .map(context => context.switchToHttp()) // context can have no http mod (e.g. WebSocket)
    .map(httpMod => httpMod.getRequest())   // context can have no http request
    .map(request => request.headers)        // request can have no headers
    .map(headers => parseHeaders(headers))  // parseHeaders can return null
    .map(jwtAuth => jwtAuth.split(' ')[1])  // auth header can contain only one part
    .getOrElse('')

  return jwtToken
}

// Without nanoption
function getJwtToken(executionContext) {
  const httpMod = executionContext.switchToHttp()
  if (!httpMod) return ''  // context can have no http mod (e.g. WebSocket)

  const request = httpMod.getRequest()
  if (!request) return ''  // context can have no http request

  const headers = request.headers
  if (!headers) return ''  // request can have no headers

  const jwtAuth = parseHeaders(headers)
  if (!jwtAuth) return ''  // headers can have no auth header

  const jwtToken = wtAuth.split(' ')[1]
  if (!jwtToken) return '' // auth header can contain only one part
  
  return jwtAuth
}
```

## Installation
 
```sh
yarn add nanoption
```
 
Or if you prefer `npm`:
 
```sh
npm i nanoption
```

## Motivation

It JS in some cases we can get an error `Cannot do something of undefined/null`. This library explicitly works with nullable values and provide clear interface for it.

Also, library support TypeSciript as first-class citizen and do some checks in complie time. For example:
```ts
import { Option } from 'nanoption'

// #map
Option.of(2).map(_ => _ * 2) // Some(4)
Option.of().map(() => 2)     // None (known at compile time)

// #get
Option.of(3).get()           // 3
Option.of().get()            // COMPILE ERROR! Can't call get() on None
```

Of course, you can use JavaScript without TypeScript, but it's not as fun.

Now [Optional Chaining Proposal](https://github.com/tc39/proposal-optional-chaining) only on stage 1, but very useful. This library give ECMAScript-version independent alternative for it.

## API

```ts
import { Option } from 'nanoption'

// Create an option
Option.of(3)                                // Some(3)
Option.of('abc')                            // Some('abc')
Option.of(null)                             // None
Option.of(undefined)                        // None

// #map
Option.of(2).map(_ => _ * 2)                // Some(4)
Option.of().map(() => 2)                    // None

// #flatMap
Option.of(3).flatMap(_ => Option.of(_ * 2)) // Some(6)
Option.of().flatMap(() => Option.of(2))     // None

// #get
Option.of(3).get()                          // 3
Option.of().get()                           // throw Exception

// #getOrElse
Option.of(1).getOrElse(2)                   // 1
Option.of(null).getOrElse(2)                // 2

// #isEmpty
Option.of(2).isEmpty()                      // false
Option.of().isEmpty()                       // true

// #nonEmpty
Option.of(2).nonEmpty()                     // true
Option.of().nonEmpty()                      // false

// #toString
Option.of(2).toString()                     // "Some(2)"
Option.of().toString()                      // "None"
```

## Alternatives

+ [tsoption](https://github.com/bcherny/tsoption) is [Fantasyland](https://github.com/fantasyland/fantasy-land)-compliant, but it requires 2-3 times more space.
