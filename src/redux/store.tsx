import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import reducers from './reducers';

export const store = configureStore({ reducer: reducers });

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Typed versions of useDispatch & useSelectors
export type AppStore = ReturnType<typeof setupStore>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
