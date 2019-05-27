/* eslint-disable max-classes-per-file */

// Base class
function Option() {
  this.isEmpty = function() {
    return this.v == null || (typeof this.v === 'number' && isNaN(this.v))
  }

  this.nonEmpty = function() {
    return !this.isEmpty()
  }
}

Option.of = function(v) {
  // eslint-disable-next-line no-use-before-define
  return v == null ? new None() : new Some(v)
}

// Empty value class
function None() {
  Option.call(this)

  this.flatMap = function() {
    return this
  }

  this.map = this.flatMap

  this.getOrElse = function(or) {
    return or
  }

  this.toString = function() {
    return 'None'
  }
}

None.prototype = Object.create(Option.prototype)
None.prototype.constructor = None

// Value class
function Some(v) {
  Option.call(this)

  this.v = v

  this.flatMap = function(f) {
    return f(v)
  }

  this.map = function(f) {
    return Option.of(f(v))
  }

  this.get = function() {
    return v
  }

  this.getOrElse = function(or) {
    return this.isEmpty() ? or : v
  }

  this.toString = function() {
    // eslint-disable-next-line prefer-template
    return 'Some(' + v + ')'
  }
}

Some.prototype = Object.create(Option.prototype)
Some.prototype.constructor = Some

module.exports = {
  Option: Option,
  Some: Some,
  None: None,
}
