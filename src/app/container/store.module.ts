import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { environment } from '../../environments/environment';

import { MainReducer } from './_store/main.reducer';
// import { stores as doctorStores } from './manage-doctor';

export const rootReducer = combineReducers({
  main: MainReducer,
  // ...doctorStores,
});

@NgModule({
  imports: [NgReduxModule],
})
export class StoreModule {
  constructor(ngRedux: NgRedux<any>) {
    if (environment.production === true) {
      ngRedux.configureStore(rootReducer, {});
    } else {
      ngRedux.configureStore(rootReducer, {});
      // ngRedux.configureStore(rootReducer, {}, [createLogger()]);
    }
  }
}
