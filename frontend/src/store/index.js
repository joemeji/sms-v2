import { combineReducers, createStore } from 'redux';

function test(state = '', action) {
  return state;
}

const store = combineReducers({
  test
});

export default createStore(store);