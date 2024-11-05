import axiosInstance from './axiosInstance';
import { Type } from '../types/types';
import { useTranslation } from 'react-i18next';

export const fetchTypes = async (): Promise<Type[]> => {
  const { i18n } = useTranslation();
  try {
    const response = await axiosInstance.get<Type[]>(`/types?lang=${i18n.language}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des types:', error);
    throw new Error('Impossible de récupérer les types');
  }  
};