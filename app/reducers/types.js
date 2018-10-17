import React from 'react';
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import ElectronStore from 'electron-store';

// export type counterStateType = {
//   +counter: number
// };

export type Action = {
  +type: string,
  payload: ?any,
};


export type Student = {
  name: string,
  username: string,
  rating: number
};

export type Students = Array<Student>;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;

export type GetState = () => Object;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type PromiseAction = Promise<Action>;

// prob should move this somewhere else
// eslint-disable-next-line import/prefer-default-export
export const store = new ElectronStore();

export type ReactObjRef<ElementType: React.ElementType> =
  {current: null | React.ElementRef<ElementType>}

export type repoType = { id: number, label: string, value: string };

export type repoListType = Array<repoType>;
