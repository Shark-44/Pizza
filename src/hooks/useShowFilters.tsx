import { useEffect, useState } from "react";
import { Basket } from "../types/types";


export const useShowFilters = (orderItems: Basket[]) => {
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    setShowFilters(orderItems.length === 0);
  }, [orderItems]);

  return { showFilters, setShowFilters };
};
