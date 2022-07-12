import { extend } from "umi-request";
import { message } from "antd";

// code需要message的范围
const MESSAGE_ERROR_ARR = [400];

const request = extend({
  prefix: "/api",
  timeout: 10000,
  errorHandler: () => {},
  credentials: "include",
});

request.use(async (ctx, next) => {
  await next();
  const { res } = ctx;

  const { code, message: msg } = res;
  if (MESSAGE_ERROR_ARR.includes(code)) {
    message.error(msg);
  }

  return ctx;
});



export default request;
