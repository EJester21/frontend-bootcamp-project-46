import _ from 'lodash';

// Функция для поиска отличий между двумя объектами
const diff = (obj1, obj2) => {
  // Получаем ключи обоих объектов
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Собираем все ключи в один массив и сортируем его
  const keys = _.uniq([...keys1, ...keys2]).sort();

  // Проходим по каждому ключу и проверяем, какой тип изменения произошел
  return keys.reduce((acc, key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // Если ключа нет в obj2, то он был удален
    if (!_.has(obj2, key)) {
      return { ...acc, [key]: { type: 'removed', oldValue: val1 } };
    }

    // Если ключа нет в obj1, то он был добавлен
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: { type: 'added', newValue: val2 } };
    }

    // Если оба значения являются объектами, то проходим рекурсивно по ним
    if (_.isObject(val1) && _.isObject(val2)) {
      return { ...acc, [key]: { type: 'nested', children: diff(val1, val2) } };
    }

    // Если значение по ключу отличается, то оно было обновлено
    if (!_.isEqual(val1, val2)) {
      return {
        ...acc,
        [key]: { type: 'updated', oldValue: val1, newValue: val2 },
      };
    }

    // Если значения совпадают, то никаких изменений не произошло
    return acc;
  }, {});
};

export default diff;
