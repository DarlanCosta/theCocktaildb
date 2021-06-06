import { combineReducers } from 'redux';

import drinks from './drinks/reducer';
import categories from './categories/reducer';

export default combineReducers({
  drinks,
  categories,
});
