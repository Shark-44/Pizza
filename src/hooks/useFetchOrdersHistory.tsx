import { useState, useEffect } from "react";
import { OrdersHistory } from "../types/types";
import { fetchOrdershistory } from "../api/orderService";

const useFetchOrdersHistory = (filter?: string) => {
    const [ordersHistory, setOrdersHistory] = useState<OrdersHistory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFullData = async () => {
            console.log("dans ma hook", filter)
            try {
                setLoading(true);
                const data = await fetchOrdershistory("fr", filter);
                setOrdersHistory(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchFullData();

    }, [filter]);

    return { ordersHistory, error, loading };
};

export default useFetchOrdersHistory;
