import {combineReducers} from 'redux';
import {authReducer} from './auth/auth-reducer';
import {dataReducer} from './data/data-reducer';
import {uiReducer} from './uiReducer/ui-reducer';
import {flagReducer} from './flag/flagReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  uiReducer: uiReducer,
  data: dataReducer,
  flag: flagReducer,
});

export default rootReducer;
