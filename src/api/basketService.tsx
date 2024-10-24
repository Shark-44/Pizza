import axiosInstance from './axiosInstance';
import { Basket } from '../types/types';

export const fetchBaskets = async (): Promise<Basket[]> => {
    const response = await axiosInstance.get<Basket[]>('/inbasket');
    return response.data;
  };