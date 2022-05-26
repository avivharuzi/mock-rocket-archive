export const normalizeLineEndings = (value: string): string => {
  return value.replace(/\r\n|\r/g, '\n');
};
