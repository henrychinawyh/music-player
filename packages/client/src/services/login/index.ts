import request from "../../utils/request";

// 获取二维码key
export async function getScanCodeKey() {
  return request.get("/login/qr/key", {
    params: {
      timeStamp: Date.now(),
    },
  });
}

// 根据二维码Key获取登录的二维码图片
type GetScanCodeImage = {
  key: string;
  qrimg: string;
};
export async function getScanCodeImage(params: GetScanCodeImage) {
  return request.get("/login/qr/create", {
    params,
  });
}

// 轮询获取二维码检测扫码状态接口
export async function pollerScanCode(params: {
  key: string;
  timeStamp: number;
}) {
  return request.get("/login/qr/check", {
    params,
  });
}

// 向手机发送验证码
export async function sendVerifyCode(params: { phone: string }) {
  return request.get("/captcha/sent", {
    params,
  });
}

// 验证验证码
export async function checkVerifyCode(params: {
  phone: string;
  captcha: string;
}) {
  return request.get("/captcha/verify", {
    params,
  });
}

// 手机验证码登录
export async function verifyCodeLogin(params: {
  phone: string;
  captcha: string;
}) {
  return request.get("/login/cellphone", {
    params,
  });
}

// 获取登陆状态
export async function loginStatus() {
  return request.get("/login/status");
}

// 退出登录
export async function logoutBox() {
  return request.get("/logout");
}

// 获取用户详情
export async function getCustomerDetail(params: { uid: string }) {
  return request.get("/user/detail", { params });
}
