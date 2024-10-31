
import axiosInstance from './axiosInstance';
import { Basket} from '../types/types';


export const addItem = async (
  produit_id: number,
  commande_id: number,
  

): Promise<Basket> => {
  const orderData = {
    produit_id,
    commande_id,
    quantiteCommande: 1,

  };

  try {
    const response = await axiosInstance.post<Basket>('/basket', orderData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    throw new Error('Impossible de créer la commande');
  }
};
