import { combineReducers } from '@reduxjs/toolkit';
import offerDetailsReducer from './offer-details-reducer';
import offersReducer from './offers-reducer';
import userReducer from './user-reducer';

const reducer = combineReducers({
  offers: offersReducer,
  offerDetails: offerDetailsReducer,
  user: userReducer,
});

export default reducer;
