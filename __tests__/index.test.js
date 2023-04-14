import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compares flat JSON files correctly', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFileSync(getFixturePath('result_json.txt'), 'utf-8').trim();

  expect(gendiff(filepath1, filepath2)).toEqual(expected);
});

test('compares flat YAML/YML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFileSync(getFixturePath('result_yaml.txt'), 'utf-8').trim();
  
    expect(gendiff(filepath1, filepath2)).toEqual(expected);
  });
  
