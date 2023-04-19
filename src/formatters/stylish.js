import _ from 'lodash';

const getIndent = (depth, size = 4) => ' '.repeat(depth * size);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const formatDiff = (diffObj) => {
  const iter = (obj, depth = 0) => {
    const lines = Object.entries(obj)
      .map(([key, { type, oldValue, newValue, value, children }]) => {
        switch (type) {
          case 'nested':
            return `${getIndent(depth)}${key}: ${iter(children, depth + 1)}`;

          case 'added':
            return `${getIndent(depth, 2)}+ ${key}: ${stringify(newValue, depth + 1)}`;

          case 'removed':
            return `${getIndent(depth, 2)}- ${key}: ${stringify(oldValue, depth + 1)}`;

          case 'updated':
            return `${getIndent(depth, 2)}- ${key}: ${stringify(oldValue, depth + 1)}\n${getIndent(depth, 2)}+ ${key}: ${stringify(newValue, depth + 1)}`;

          default:
            return `${getIndent(depth)}${key}: ${stringify(value, depth + 1)}`;
        }
      });

    return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
  };

  return iter(diffObj);
};

export default formatDiff;