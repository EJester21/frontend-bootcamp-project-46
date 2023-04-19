import _ from 'lodash';

const stringify = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };
  
  const plain = (diffObj, pathAcc = []) => {
    const lines = Object.entries(diffObj).flatMap(([key, node]) => {
      const {
        type,
        newValue,
        oldValue,
        children,
      } = node;
  
      const currentPath = [...pathAcc, key];
      const property = currentPath.join('.');
      const oldValueString = stringify(oldValue);
      const newValueString = stringify(newValue);
  
      switch (type) {
        case 'nested':
          return plain(children, currentPath);
        case 'added':
          return `Property '${property}' was added with value: ${newValueString}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${oldValueString} to ${newValueString}`;
        default:
          return [];
      }
    });
  
    return lines.join('\n');
  };
  
  export default plain;
  