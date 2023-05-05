export const isString = (str: unknown): str is string => typeof str === 'string';

export const isObject = (val: unknown): val is object => typeof val === 'object';
