import request from "../../utils/request";

// 更改用户信息
interface UpdateInfoInterface {
  gender: "0" | "1" | "2";
  birthday: string;
  nickName: string;
  signature: string;
  [keys: string]: any;
}
export async function updateInfo(params: UpdateInfoInterface) {
  return request.get("/user/update", {
    params,
  });
}
