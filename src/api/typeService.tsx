import axiosInstance from './axiosInstance';
import { Type } from '../types/types';


export const fetchTypes = async (lang: string): Promise<Type[]> => {
  
  try {
    const response = await axiosInstance.get<Type[]>(`/types?lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des types:', error);
    throw new Error('Impossible de récupérer les types');
  }  
};