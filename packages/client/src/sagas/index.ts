import { all, takeEvery } from "redux-saga/effects";

import { isLogin } from "./login"; // 登录的异步处理

// 登录Saga
function* loginSagas() {
  yield takeEvery("isLogin", isLogin);
}

function* rootSaga() {
  yield all([loginSagas()]);
}

export default rootSaga;
