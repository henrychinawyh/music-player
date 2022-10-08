import { call, put } from "redux-saga/effects";

import { getSongURL } from "../services/song";

// 存储当前用户详情信息
function* updateList(action: any): Generator<any> {
  //   yield put({
  //     type: "UPDATE_PLAYLIST",
  //     payload: action.payload,
  //   });
  console.log(action, "+++++");
  const { payload } = action;
  const res: any = yield call(getSongURL, { id: payload });
  if (Array.isArray(res?.data) && res?.data?.length) {
    yield put({
      type: "UPDATE_LIST",
      payload: res.data,
    });
  }
}

export { updateList };
