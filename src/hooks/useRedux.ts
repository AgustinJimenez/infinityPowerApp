import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { StoreType, AppDispatch } from '../root/rootStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
