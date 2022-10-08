import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import songReducer from "./songReducer";

export default combineReducers({
  login: loginReducer,
  song: songReducer,
});
