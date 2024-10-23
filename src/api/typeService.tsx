import axiosInstance from './axiosInstance';
import { Type } from '../types/types';

export const fetchTypes = async (): Promise<Type[]> => {
    const response = await axiosInstance.get<Type[]>('/types');
    return response.data;
  };