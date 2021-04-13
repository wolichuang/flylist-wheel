/**
 * title: spaces
tags: string,regexp,intermediate
 */

const spaces = (str, pattern = /\s/) => str.split(pattern).filter(Boolean);

console.log(spaces('I love javaScript!!'));
console.log('======================');

/**
 * title: words
tags: string,regexp,intermediate
 */
const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean);

console.log(words('python, javaScript & coffee'));
console.log('======================');

/**
 * title: wordWrap
tags: string,regexp,intermediate
 */
const wordWrap = (str, max, br = '\n') =>
  str.replace(
    new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'),
    '$1' + br
  );
console.log(
  wordWrap(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.',
    32,
    '\r\n'
  )
);
console.log('======================');
