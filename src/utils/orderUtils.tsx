import { OrdersHistory } from "../types/types";

// Calcul du nombre total de ventes
export const calculateTotalSales = (orders: any[]) => {
    return orders.length;
  };
  
  // Calcul de la somme des prix
  export const calculateTotalPrice = (orders: OrdersHistory[]) => {
    return orders.reduce((sum, order) => sum + Number(order.prixtotalCommande), 0);
  };
  
  // Calcul de la quantité totale des produits vendus
  export const calculateTotalQuantity = (orders: OrdersHistory[]) => {
    return orders.reduce((sum, order) => {
      if (!order.products) return sum;
      
      const orderTotal = order.products.reduce((productSum, product) => {
        return productSum + (product.quantiteCommande || 0);
      }, 0);
      
      return sum + orderTotal;
    }, 0);
  };
  