// placeholder占位符
const placeholder = "--";

// 将空字段转换为占位符
const dataFormat = (obj: any) => {
  if (typeof obj === "string" && !obj.length) {
    return placeholder;
  } else if (typeof obj === "undefined") {
    return placeholder;
  } else if (typeof obj === "object" && !obj) {
    return placeholder;
  }

  return obj;
};

export { dataFormat, placeholder };
