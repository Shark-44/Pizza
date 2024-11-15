import { useEffect, useState, useCallback } from "react";
import { fetchProductById } from "../api/productService";
import { Basket, Product } from "../types/types";
import  useLanguage  from '../hooks/useLanguage'

// Hook personnalisé pour gérer les détails des produits
export const useProductDetails = (orderItems: Basket[]) => {
  const { language } = useLanguage();
  const [productDetails, setProductDetails] = useState<Map<number, Product | { nomProduit: string }>>(
    new Map()
  );
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(new Set());

  const loadProductDetails = useCallback(async () => {
    const productsToLoad = orderItems
      .map(item => item.produitId)
      .filter(id => !productDetails.has(id) && !loadingProducts.has(id));

    if (productsToLoad.length === 0) return;

    setLoadingProducts(prev => new Set([...prev, ...productsToLoad]));

    // Temporairement marquer les produits comme "chargement" pour éviter les transitions visibles
    setProductDetails(prev => {
      const newDetails = new Map(prev);
      productsToLoad.forEach(id => newDetails.set(id, { nomProduit: " " }));
      return newDetails;
    });

    try {
      const productData = await Promise.all(productsToLoad.map(id => fetchProductById(id, language)));

      setProductDetails(prev => {
        const newDetails = new Map(prev);
        productData.forEach((product, index) => newDetails.set(productsToLoad[index], product));
        return newDetails;
      });
    } catch (error) {
      console.error("Erreur lors du chargement des détails des produits", error);
    } finally {
      setLoadingProducts(prev => {
        const updatedLoading = new Set(prev);
        productsToLoad.forEach(id => updatedLoading.delete(id));
        return updatedLoading;
      });
    }
  }, [orderItems, productDetails, loadingProducts]);

  useEffect(() => {
    if (orderItems.length > 0) loadProductDetails();
  }, [orderItems, loadProductDetails]);

  const getProductDisplay = useCallback(
    (productId: number) => productDetails.get(productId)?.nomProduit || " ",
    [productDetails]
  );

  return { productDetails, getProductDisplay, loadingProducts };
};
