import fs from 'fs';
import path from 'path';
import diff from './diff.js';
import parse from './parsers.js';
import formatDiff from './formatters/stylish.js';

// Функция для получения содержимого файла
const getFileContent = (filepath) => fs.readFileSync(filepath, 'utf-8');

// Функция для получения формата файла
const getFormat = (filepath) => path.extname(filepath).slice(1);

// Функция для сравнения двух объектов
const gendiff = (filepath1, filepath2) => {
  // Получаем содержимое файлов
  const data1 = getFileContent(filepath1);
  const data2 = getFileContent(filepath2);

  // Получаем форматы файлов
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  // Парсим данные из файлов в объекты
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  // Получаем объект разницы между двумя объектами
  const diffObj = diff(obj1, obj2);

  // Преобразуем объект разницы в строку в нужном формате
  const result = formatDiff(diffObj);

  // Возвращаем строку с разницей между двумя объектами
  return `${result}`;
};

export default gendiff;
