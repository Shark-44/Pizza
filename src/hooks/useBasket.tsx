// src/hooks/useBasket.ts
import { useState } from 'react';
import basketService from '../api/basketService';
import { Basket, AddItemParams, UpdateQuantityParams } from '../types/types';


export const useBasket = () => {
  const [data, setData] = useState<Basket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBasket = async () => {
    setIsLoading(true);
    try {
      const result = await basketService.getBasket();
      setData(result); // Met à jour l'état avec les données du panier
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const addItemToBasket = async (params: AddItemParams) => {
    try {
      const newItem = await basketService.addItem(params);
      setData((prevData) => [...prevData, newItem]); // Ajoute le nouvel article au panier actuel
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  const updateQuantityInBasket = async (params: UpdateQuantityParams) => {
    try {
      const updatedItem = await basketService.updateQuantity(params);
      setData((prevData) =>
        prevData.map((item) =>
          item.produit_id === params.productId && item.commande_id === params.orderId
            ? updatedItem
            : item
        )
      ); // Met à jour l'article avec la nouvelle quantité
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  return {
    data, // État du panier
    isLoading, // Indicateur de chargement
    error, // Erreur (s'il y en a)
    fetchBasket, // Fonction pour récupérer le panier
    addItemToBasket, // Fonction pour ajouter un article
    updateQuantityInBasket, // Fonction pour mettre à jour la quantité d'un article
  } as const;
};
