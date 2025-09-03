/**
 * Compares two strings with normalization and logs a diff if they don't match.
 * Useful for debugging long strings with special characters.
 */
function expectTextMatch(actual, expected) {
  const normalize = str =>
    str.replace(/\s+/g, ' ').trim(); // collapse whitespace and trim edges

  const actualNorm = normalize(actual);
  const expectedNorm = normalize(expected);

  if (actualNorm !== expectedNorm) {
    console.error('❌ Text mismatch detected!');
    console.error('--- Expected ---');
    console.error(expectedNorm);
    console.error('--- Actual ---');
    console.error(actualNorm);
    throw new Error('Text does not match expected value.');
  }
}

module.exports = { expectTextMatch };