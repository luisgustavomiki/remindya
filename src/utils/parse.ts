export function isString(test: unknown): test is string {
  return typeof test === 'string';
}

export function isDate(test: unknown): test is Date {
  return test instanceof Date;
}

export function isObject(test: unknown): test is Record<string, unknown> {
  return typeof test === 'object';
}
