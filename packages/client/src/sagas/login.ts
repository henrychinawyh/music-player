import { put } from "redux-saga/effects";

// 存储当前用户详情信息
function* saveInfo(action: any) {
  yield put({
    type: "SAVE_INFO",
    payload: action.payload,
  });
}

export {  saveInfo };
