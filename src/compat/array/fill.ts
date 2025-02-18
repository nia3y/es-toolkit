import { fill as fillToolkit } from '../../array/fill.ts';

/**
 * Fills elements of an array with a specified value from the start position up to, but not including, the end position.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @param {Array<T | U>} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @param {S} [start=0] - The start position. Defaults to 0.
 * @param {V} [end=arr.length] - The end position. Defaults to the array's length.
 * @returns {Array<T | U>} The array with the filled values.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = fill(array, 'a');
 * // => ['a', 'a', 'a']
 *
 * const result = fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * const result = fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 *
 * const result = fill(array, '*', -2, -1);
 * // => [1, '*', 3]
 */
export function fill<T>(array: unknown[], value?: T): T[];
export function fill<T, U, S>(array: Array<T | U>, value: U, start: S): Array<T | U>;
export function fill<T, U, S, V>(array: Array<T | U>, value: U, start: S, end: V): Array<T | U>;
export function fill<T, U>(array: Array<T | U>, value: U, start = 0, end = array.length): Array<T | U> {
  start = Math.floor(start);
  end = Math.floor(end);

  if (!start) {
    start = 0;
  }
  if (!end) {
    end = 0;
  }

  return fillToolkit(array, value, start, end);
}
