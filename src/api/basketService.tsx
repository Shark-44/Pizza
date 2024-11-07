import { apiCall } from './wrapper';
import { Basket } from '../types/types';

// Ajouter un article au panier
export const addItem = async (
  produit_id: number,
  commande_id: number
): Promise<Basket> => {
  const orderData = {
    produit_id,
    commande_id,
    quantiteCommande: 1,
  };

  return apiCall<Basket>('post', '/basket', {
    data: orderData,
    errorNamespace: 'api.addItem.basket',
  });
};

// Mettre à jour la quantité d'un article dans le panier
export const upQuantite = async (
  produit_id: number,
  commande_id: number,
  quantiteCommande: number
): Promise<Basket> => {
  const orderData = {
    produit_id,
    commande_id,
    quantiteCommande,
  };

  return apiCall<Basket>('put', '/basket', {
    data: orderData,
    errorNamespace: 'api.updateQuantity.basket',
  });
};

// Supprimer un article du panier
export const deleteBasket = async (
  produit_id: number,
  commande_id: number
): Promise<void> => {
  const requestData = { produit_id, commande_id };

  return apiCall<void>('delete', '/basket', {
    data: requestData,
    errorNamespace: 'api.deleteItem.basket',
  });
};
