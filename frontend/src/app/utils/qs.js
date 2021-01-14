import { isEmpty, join, lensIndex, map, over, pipe, reject, toPairs } from 'ramda';

export const stringify = pipe(
  reject(isEmpty),
  toPairs,
  map(over(lensIndex(1), encodeURIComponent)),
  map(join('=')),
  join('&')
);
