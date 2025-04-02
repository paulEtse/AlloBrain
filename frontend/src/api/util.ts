const reviver = (key: string, value: unknown) => {
  if (["created_at", "updated_at"].includes(key) && value) {
    return new Date(value as string);
  }
  return value;
};

const ellipsis = function (
  str: string,
  length: number = 500,
  ending: string = "..."
) {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const DEFAULT_PAGINATION_LIMIT = 9;

export { DEFAULT_PAGINATION_LIMIT, ellipsis, reviver };
