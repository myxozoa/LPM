import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import ElectronStore from 'electron-store';

// export type counterStateType = {
//   +counter: number
// };

export type Action = {
  +type: string
};

export type GetState = () => {};

export type Student = {
  name: string,
  username: string,
  rating: number
};

export type Students = Array<Student>;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;

// prob should move this somewhere else
// eslint-disable-next-line import/prefer-default-export
export const store = new ElectronStore();
