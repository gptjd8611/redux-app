// store.js
import { createStore,combineReducers  } from 'redux';
import { moneyReducer } from './reducer';
import { studentReducer } from './studentReducer';


const rootReducer = combineReducers({
    money: moneyReducer,
    student: studentReducer,
});
const store = createStore(rootReducer);

export default store;
