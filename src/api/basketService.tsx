
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

export const upQuantite = async (
  produit_id: number,
  commande_id: number,
  quantiteCommande: number,
  

): Promise<Basket> => {
  const orderData = {
    produit_id,
    commande_id,
    quantiteCommande,

  };

  try {
    const response = await axiosInstance.put<Basket>('/basket', orderData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise a jour quantite:', error);
    throw new Error('Impossible de mettre a jour quantiteCommande');
  }
};

export const deleteBasket = async (produit_id: number, commande_id: number): Promise<void> => {
  const requestData = { produit_id, commande_id };

  try {
  
    await axiosInstance.delete('/basket', { data: requestData });
    console.log('Ligne supprimée du panier avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément du panier:', error);
    throw new Error('Impossible de supprimer l\'élément du panier');
  }
};
