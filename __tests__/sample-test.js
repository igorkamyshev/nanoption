const { Option } = require('..')

test('', () => {
  function foo(bar) {
    return Option.of(Option.of(bar).isEmpty())
  }

  const actual = foo('abcd')
    .map(s => s.toString())
    .getOrElse('bad')

  expect(actual).toBe('false')
})

test('', () => {
  const actual = Option.of(true)
    .getOrElse(false)
    .toString()

  expect(actual).toBe('true')
})

describe('flatMap', () => {
  test('Some#flatMap', () => {
    const actual = Option.of(3)
      .flatMap(_ => Option.of(_ * 2))
      .get()

    expect(actual).toBe(6)
  })

  test('Some#flatMap', () => {
    const actual = Option.of(null)
      .flatMap(() => Option.of(2))
      .isEmpty()

    expect(actual).toBe(true)
  })

  test('Some#get', () => {
    const actual = Option.of(3).get()

    expect(actual).toBe(3)
  })
})

describe('getOrElse', () => {
  test('Some#getOrElse', () => {
    const actual = Option.of(1).getOrElse(3)

    expect(actual).toBe(1)
  })

  test('Some(0)#getOrElse', () => {
    const actual = Option.of(0).getOrElse(12)

    expect(actual).toBe(0)
  })

  test('Some(false)#getOrElse', () => {
    const actual = Option.of(false).getOrElse(true)

    expect(actual).toBe(false)
  })

  test('Some("")#getOrElse', () => {
    const actual = Option.of('').getOrElse('Hello')

    expect(actual).toBe('')
  })

  test('Some(NaN)#getOrElse', () => {
    const actual = Option.of(NaN).getOrElse(12)

    expect(actual).toBe(12)
  })

  test('None#getOrElse', () => {
    const actual = Option.of(null).getOrElse(3)

    expect(actual).toBe(3)
  })
})

describe('isEmpty', () => {
  test('Some#isEmpty', () => {
    const actual = Option.of(3).isEmpty()

    expect(actual).toBe(false)
  })

  test('None#isEmpty (1)', () => {
    const actual = Option.of(null).isEmpty()

    expect(actual).toBe(true)
  })

  test('None#isEmpty (2)', () => {
    const actual = Option.of(undefined).isEmpty()

    expect(actual).toBe(true)
  })
})

describe('map', () => {
  test('Some#map', () => {
    const actual = Option.of(3)
      .map(() => 4)
      .getOrElse(5)

    expect(actual).toBe(4)
  })

  test('None#map', () => {
    const actual = Option.of(null)
      .map(() => 4)
      .getOrElse(5)

    expect(actual).toBe(5)
  })
})

describe('nonEmpty', () => {
  test('Some#nonEmpty', () => {
    const actual = Option.of(3).nonEmpty()

    expect(actual).toBe(true)
  })

  test('None#nonEmpty (1)', () => {
    const actual = Option.of(null).nonEmpty()

    expect(actual).toBe(false)
  })

  test('None#nonEmpty (2)', () => {
    const actual = Option.of(undefined).nonEmpty()

    expect(actual).toBe(false)
  })
})

describe('toString', () => {
  test('Some#toString', () => {
    const actual = Option.of(3).toString()

    expect(actual).toBe('Some(3)')
  })

  test('None#toString', () => {
    const actual = Option.of(null).toString()

    expect(actual).toBe('None')
  })
})
