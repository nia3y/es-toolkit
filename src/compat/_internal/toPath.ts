/**
 * Converts a deep key string into an array of path segments.
 *
 * This function takes a string representing a deep key (e.g., 'a.b.c' or 'a[b][c]') and breaks it down into an array of strings, each representing a segment of the path.
 *
 * @param deepKey - The deep key string to convert.
 * @returns An array of strings, each representing a segment of the path.
 *
 * Examples:
 *
 * toPath('a.b.c') // Returns ['a', 'b', 'c']
 * toPath('a[b][c]') // Returns ['a', 'b', 'c']
 * toPath('.a.b.c') // Returns ['', 'a', 'b', 'c']
 * toPath('a["b.c"].d') // Returns ['a', 'b.c', 'd']
 * toPath('') // Returns []
 * toPath('.a[b].c.d[e]["f.g"].h') // Returns ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
 */
export function toPath(deepKey: string): string[] {
  const ESCAPE_REGEXP = /\\(\\)?/g;
  const PROPERTY_REGEXP = RegExp(
    // Match anything that isn't a dot or bracket.
    '[^.[\\]]+' +
      '|' +
      // Or match property names within brackets.
      '\\[(?:' +
      // Match a non-string expression.
      '([^"\'][^[]*)' +
      '|' +
      // Or match strings (supports escaping characters).
      '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
      ')\\]' +
      '|' +
      // Or match "" as the space between consecutive dots or empty brackets.
      '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
    'g'
  );

  const result: string[] = [];

  if (deepKey[0] === '.') {
    result.push('');
  }

  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = PROPERTY_REGEXP.exec(deepKey)) !== null) {
    let key = match[0];
    const expr = match[1];
    const quote = match[2];
    const substr = match[3];

    if (quote) {
      key = substr.replace(ESCAPE_REGEXP, '$1');
    } else if (expr) {
      key = expr;
    }

    result.push(key);

    if (PROPERTY_REGEXP.lastIndex === lastIndex) {
      PROPERTY_REGEXP.lastIndex++;
    } else {
      lastIndex = PROPERTY_REGEXP.lastIndex;
    }
  }

  return result;
}
