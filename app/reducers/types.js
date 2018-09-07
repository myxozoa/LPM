import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

// export type counterStateType = {
//   +counter: number
// };

export type Action = {
  +type: string
};

// export type GetState = () => counterStateType;

export type Student = {
  name: string,
  username: string,
  rating: number
};

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
