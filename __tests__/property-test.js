const fc = require('fast-check')

const { Option, None, Some } = require('..')

const nonEmpty = () =>
  fc.oneof(fc.string(), fc.integer(), fc.double(), fc.boolean())

const empty = () => fc.constantFrom(null, undefined)

describe('nonEmpty values', () => {
  test('Option must be non-empty', () => {
    fc.assert(fc.property(nonEmpty(), value => Option.of(value).nonEmpty()))
  })

  test('Option must have a same value', () => {
    fc.assert(
      fc.property(nonEmpty(), value => Option.of(value).get() === value),
    )
  })

  test('Option must skip getOrElse', () => {
    fc.assert(
      fc.property(
        nonEmpty(),
        fc.anything(),
        (value, or) => Option.of(value).getOrElse(or) === value,
      ),
    )
  })
})

describe('isEmpty values', () => {
  test('Option must be epmty', () => {
    fc.assert(fc.property(empty(), value => Option.of(value).isEmpty()))
  })

  test('Option must have no value', () => {
    fc.assert(
      fc.property(
        empty(),
        value => typeof Option.of(value).get === 'undefined',
      ),
    )
  })

  test('Option must return `or` from getOrElse', () => {
    fc.assert(
      fc.property(
        empty(),
        nonEmpty(),
        (value, or) => Option.of(value).getOrElse(or) === or,
      ),
    )
  })
})

test('isEmpty vs nonEmpty', () => {
  fc.assert(
    fc.property(fc.anything(), value => {
      const option = Option.of(value)

      return option.isEmpty() !== option.nonEmpty()
    }),
  )
})

describe('toString', () => {
  test('Some#toString', () => {
    fc.assert(
      fc.property(
        nonEmpty(),
        value => Option.of(value).toString() === `Some(${value})`,
      ),
    )
  })

  test('None#toString', () => {
    fc.assert(
      fc.property(empty(), value => Option.of(value).toString() === 'None'),
    )
  })
})

describe('inheritance', () => {
  test('instance of Option', () => {
    fc.assert(
      fc.property(fc.anything(), value => Option.of(value) instanceof Option),
    )
  })

  test('instance of None or Some', () => {
    fc.assert(
      fc.property(fc.anything(), value => {
        const isSome = Option.of(value) instanceof Some
        const isNone = Option.of(value) instanceof None

        return isSome || isNone
      }),
    )
  })
})
