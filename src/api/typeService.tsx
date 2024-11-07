// src/services/typeService.ts
import { Type } from '../types/types';
import { apiCall } from './wrapper';

export const fetchTypes = async (lang: string): Promise<Type[]> => {
  return apiCall<Type[]>('get', `/types?lang=${lang}`, {
    params: { lang },
    errorNamespace: 'api.fetch.types' 
  });
};