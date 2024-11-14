import { useState, useEffect } from "react";
import { OrdersHistory } from "../types/types";
import { fetchOrdershistory } from "../api/orderService";

const useFetchOrdersHistory = () => {
    const [ordersHistory, setOrdersHistory] = useState<OrdersHistory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFullData = async () => {
            try {
                setLoading(true);
                const data = await fetchOrdershistory("fr");
                setOrdersHistory(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchFullData();
    }, []);

    return { ordersHistory, error, loading };
};

export default useFetchOrdersHistory;
