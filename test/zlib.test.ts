import Zlib from '../src/zlib';

import { range, linspace, product, checkEncodeDecode } from './common';

const codecs = [
  new Zlib(),
  new Zlib(-1),
  new Zlib(0),
  new Zlib(5),
  new Zlib(9),
];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
  range(323332, '<i2'),
];

test('Ensure all equal', () => {
  for (const [codec, arr] of product(codecs, arrays)) {
    const encAndDec = checkEncodeDecode(codec, arr);
    expect(arr).toEqual(encAndDec);
  }
});

test('Throws on invalid compression level', () => {
  expect(() => new Zlib(10)).toThrow();
  expect(() => new Zlib(-2)).toThrow();
});
