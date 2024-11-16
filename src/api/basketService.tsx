import { apiCall } from './wrapper';
import { Basket } from '../types/types';

// Ajouter un article au panier
export const addItem = async (
  produitId: number,
  commandeId: number
): Promise<Basket> => {
  const orderData = {
    produitId,
    commandeId,
    quantiteCommande: 1,
  };

  return apiCall<Basket>('post', '/basket', {
    data: orderData,
    errorNamespace: '{lang}.api.addItem.basket',
  });
};

// Mettre à jour la quantité d'un article dans le panier
export const upQuantite = async (
  produitId: number,
  commandeId: number,
  quantiteCommande: number
): Promise<Basket> => {
  const BasketData = {
    produitId,
    commandeId,
    quantiteCommande,
  };
  return apiCall<Basket>('put', '/basket', {
    data: BasketData,
    errorNamespace: '{lang}.api.updateQuantity.basket',
  });
};

// Supprimer un article du panier
export const deleteBasket = async (
  produitId: number,
  commandeId: number
): Promise<void> => {
  const requestData = { produitId, commandeId };

  return apiCall<void>('delete', '/basket', {
    data: requestData,
    errorNamespace: '{lang}.api.deleteItem.basket',
  });
};
