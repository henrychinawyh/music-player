import { all, takeEvery } from "redux-saga/effects";

import { saveInfo } from "./login"; // 登录的异步处理

// 登录Saga
function* loginSagas() {
  // yield takeEvery("saveInfo", saveInfo);
}

function* rootSaga() {
  yield all([loginSagas()]);
}

export default rootSaga;
