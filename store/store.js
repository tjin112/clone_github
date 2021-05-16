import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  count: 0,
};
const userInitialState = {
  username: "Taimin",
};
const ADD = "ADD";
function countReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.number || 1) };
    default:
      return state;
  }
  // return{ count: state.count+1,name:state.name + ' ' +"Jin"}
}
const UPDATE_USERNAME = "UPDATE_USERNAME";
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name,
      };
    default:
      return state;
  }
}
const allReducers = combineReducers({
  count: countReducer,
  user: userReducer,
});
//创建action
export function add(number) {
  return {
    type: "ADD",
    number,
  };
}
function addasync(number) {
  // 以下的（dispatch) 相当于sotre.dispatch
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(add(number));
    }, 1000);
    console.log(getState());
  };
}
// console.log(store.getState())
//调用dispatch 方法之后，store会执行reducer（）
export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        count: initialState,
        user: userInitialState,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
