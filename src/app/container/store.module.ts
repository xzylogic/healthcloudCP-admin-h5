import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { environment } from '../../environments/environment';

import { MainReducer } from './_store/main.reducer';
import { stores as mdStores } from './manage-mac-database';
import { stores as rfaStores } from './manage-receive-folic-acid';
import { stores as piStores } from './manage-planned-immunity';

export const rootReducer = combineReducers({
  main: MainReducer,
  ...mdStores,
  ...rfaStores,
  ...piStores,
});

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(ngRedux: NgRedux<any>) {
    if (environment.production === true) {
      ngRedux.configureStore(rootReducer, {});
    } else {
      ngRedux.configureStore(rootReducer, {}, [createLogger()]);
    }
  }
}
