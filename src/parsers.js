import yaml from 'js-yaml';

// Парсеры для поддерживаемых форматов
const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

// Функция для парсинга данных из файла в объект
const parse = (data, format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Unknown format: ${format}`);
  }
  return parser(data);
};

export default parse;
