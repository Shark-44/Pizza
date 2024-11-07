// src/utils/apiWrapper.ts
import { AxiosError, AxiosRequestConfig } from 'axios';
import i18n from '../i18n';
import api from './axiosInstance';


export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}


export async function apiCall<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  options?: {
    data?: any;
    params?: any;
    config?: AxiosRequestConfig;
    errorNamespace?: string; 
  }
) {
  try {
    const response = await api[method]<T>(
      endpoint,
      options?.data,
      options?.config
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
  
    const errorNamespace = options?.errorNamespace || 'api.common';
    
    let errorMessage: string;
    
    if (!axiosError.response) {
      errorMessage = i18n.t(`${errorNamespace}.network_error`);
    } else {
      switch (axiosError.response.status) {
        case 404:
          errorMessage = i18n.t(`${errorNamespace}.not_found`);
          break;
        case 500:
          errorMessage = i18n.t(`${errorNamespace}.server_error`);
          break;
        default:
            console.log(i18n.t('api.fetch.types.default_error')); 
          errorMessage = i18n.t(`${errorNamespace}.default_error`);
      }
    }

    console.error('API Error:', {
      endpoint,
      status: axiosError.response?.status,
      message: errorMessage,
      originalError: axiosError
    });

    throw new APIError(
      errorMessage,
      axiosError.response?.status,
      `${method.toUpperCase()}_${endpoint.toUpperCase()}_ERROR`
    );
  }
}