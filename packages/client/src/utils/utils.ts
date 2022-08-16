import dayjs from "dayjs";

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

// 将毫秒转换为时分格式
const timeFilter = (time: any): string => {
  if (time === 0 || time === placeholder || !time) {
    return placeholder;
  }

  const day = dayjs(0).millisecond(parseInt(time));
  let str = "";
  if (day.minute() >= 0) {
    str += day.minute() + ":";
  }

  if (day.second() >= 0) {
    str += day.second();
  }

  return str;
};

export { dataFormat, placeholder, timeFilter };
