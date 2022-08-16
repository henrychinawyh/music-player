export interface UploadAvatarProps {
  info?: any; // 用户信息
  [keys: string]: any;
}

// 更改用户信息
export interface UpdateInfoInterface {
  gender: "0" | "1" | "2";
  birthday: string;
  nickName: string;
  signature: string;
  [keys: string]: any;
}
