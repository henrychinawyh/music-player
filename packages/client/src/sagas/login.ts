import { put } from "redux-saga/effects";

function* isLogin(action: any) {
  yield put({
    type: "IS_LOGIN",
    payload: action.payload,
  });
}

export { isLogin };
