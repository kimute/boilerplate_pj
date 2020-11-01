//reducer: 前statと現sateを組みわせてnetstateを作成
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_action/types";

export default function (state = {}, action) {
  //user_actionのtypeに合わせて処理
  switch (action.type) {
    case LOGIN_USER:
      //...←state={}をそのまま使うという意味
      //action.payload:response from server
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    default:
      return state;
  }
}
