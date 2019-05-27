# nanoption

Tiny (220 bytes), zero dependency wrapper for nullable values.

## TL;RD

```js
// Without nanoption
const parsedInput = nullableVar != null
  ? parseInt(nullableVar) + 12
  : 1

calculate(parsedInput)

// With nanoption
import { Option } from 'nanoption'

const parsedInput = Option.of(nullableVar)
  .map(v => parseInt(v))
  .map(v => v + 12)
  .getOrElse(1)

calculate(parsedInput)
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
