import { useState, useEffect } from 'react';
import { finalOrder } from "../api/orderService";
import { FullOrder } from '../types/types';
import  useLanguage  from '../hooks/useLanguage'

const useFetchFullOrders = (orderId: number) => {
    const { language } = useLanguage();
    const [fullOrder, setFullOrder] = useState<FullOrder | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFullData = async () => {
            try {
                setLoading(true);
                const data = await finalOrder(orderId, language);
                setFullOrder(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchFullData();
    }, [orderId, language]);

    return { fullOrder, error, loading };
};

export default useFetchFullOrders;