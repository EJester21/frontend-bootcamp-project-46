#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import gendiff from '../src/index.js'

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>') // задаем аргументы командной строки
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options)); // вызываем функцию gendiff для сравнения двух файлов и вывода результата в консоль
  });

program.parse(process.argv);