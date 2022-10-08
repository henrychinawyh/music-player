import { all, call, put, takeEvery } from "redux-saga/effects";

import { saveInfo } from "./login"; // 登录的异步处理
import { updateList } from "./playlist";

// 登录Saga
function* loginSagas() {
  // yield takeEvery("saveInfo", saveInfo);
}

// 更新playList
function* updatePlayList() {
  yield takeEvery("updatePlayList", updateList);
}

function* rootSaga() {
  yield all([loginSagas(), updatePlayList()]);
}

export default rootSaga;
