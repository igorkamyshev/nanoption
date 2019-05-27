export declare abstract class Option<T> {
  abstract flatMap<U>(f: (value: T) => Option<U>): Option<U>
  abstract getOrElse<U extends T>(def: U): T | U
  abstract isEmpty(): this is None<T>
  abstract map<U>(f: (value: T) => U): Option<U>
  abstract nonEmpty(): this is Some<T>
  abstract toString(): string
  static of<T = {}>(value?: null | undefined): None<T>
  static of<T>(value?: T): Some<T>
}
export declare class None<T> extends Option<T> {
  flatMap<U>(_f: (value: T) => Option<U>): None<U>
  getOrElse<U extends T>(def: U): U
  isEmpty(): boolean
  map<U>(_f: (value: T) => U): None<U>
  nonEmpty(): this is Some<T> & false
  toString(): string
}
export declare class Some<T> extends Option<T> {
  private value
  constructor(value: T)
  flatMap<U = T>(f: (value: T) => Some<U>): Some<U>
  flatMap<U = T>(f: (value: T) => None<U>): None<U>
  flatMap<U = T>(f: (value: T) => Option<U>): Option<U>
  get(): T
  getOrElse<U extends T>(def: U): T | U
  isEmpty(): this is None<T> & false
  map<U>(f: (value: T) => U): Some<U>
  nonEmpty(): this is Some<T> & true
  toString(): string
}
