import { Action } from 'redux';
import { IMainState, Menu } from './main.state';
import { DelAdminAction, InitNavAction, SetTreeAction, SetNavAction, MainAction, SetAdminAction, UpdateTagAction } from './main.action';

const __assign = (this && this.__assign) || Object.assign || function (t) {
  for (let s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (const p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) {
        t[p] = s[p];
      }
    }
  }
  return t;
};

export function MainReducer(state: IMainState = {
  adminId: 0,
  adminName: '',
  navigation: [],
  navTree: {}
}, action: Action): IMainState {
  switch (action.type) {
    case MainAction.SET_ADMIN:
      return handleSetAdminAction(state, <any>action);
    case MainAction.DEL_ADMIN:
      return handleDelAdminAction(state, <any>action);
    case MainAction.SET_TREE:
      return handleSetTreeAction(state, <any>action);
    case MainAction.SET_NAV:
      return handleSetNavAction(state, <any>action);
    case MainAction.INIT_NAV:
      return handleInitNavAction(state, <any>action);
    case MainAction.UPDATE_NAV:
      return handleUpdateTagAction(state, <any>action);
    default:
      return state;
  }
}

function handleSetAdminAction(state: IMainState, action: SetAdminAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.adminId = action.payload.id;
  stateCopy.adminName = action.payload.name;
  return stateCopy;
}

function handleDelAdminAction(state: IMainState, action: DelAdminAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.adminId = 0;
  stateCopy.adminName = '';
  return stateCopy;
}

function handleSetTreeAction(state: IMainState, action: SetTreeAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navTree = action.payload;
  return stateCopy;
}

function handleSetNavAction(state: IMainState, action: SetNavAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navigation = action.payload;
  return stateCopy;
}

function handleInitNavAction(state: IMainState, action: InitNavAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navigation.forEach(obj => {
    if (obj.children) {
      obj.children.forEach(subObj => {
        if (subObj.href.split('/')[1] === action.payload.path) {
          obj.open = true;
        }
      });
    }
  });
  return stateCopy;
}

function handleUpdateTagAction(state: IMainState, action: UpdateTagAction): IMainState {
  const stateCopy = __assign(state);
  stateCopy.navigation.map(sidebars => {
    if (sidebars.subBars) {
      sidebars.subBars.forEach(subObj => {
        if (subObj.key === action.payload.key && action.payload.tag !== 0) {
          subObj.tag = action.payload.tag;
          if (sidebars.key === action.payload.group) {
            sidebars.tag = 1;
          }
        }
      });
    }
  });
  return stateCopy;
}
