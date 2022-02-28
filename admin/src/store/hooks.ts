import {
  TypedUseSelectorHook,
  useDispatch as reduxUseDispatch,
  useSelector as reduxUseSelector,
} from 'react-redux';

import { AppDispatch, RootState } from './index';

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
