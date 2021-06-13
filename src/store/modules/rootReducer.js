import { combineReducers } from 'redux';

import drinks from './drinks';
import categories from './categories';
import auth from './auth';

export default combineReducers({
  drinks,
  categories,
  auth,
});
