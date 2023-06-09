import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('checks stylish formatter', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trim();

  expect(gendiff(filepath1, filepath2)).toEqual(expected);
});

test('checks plain formatter', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFileSync(getFixturePath('result_plain.txt'), 'utf-8').trim();
  
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expected);
});

test('checks JSON formatter', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFileSync(getFixturePath('result_json.txt'), 'utf-8').trim();
  
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(expected);
});