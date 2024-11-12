import { apiCall } from './wrapper';
import { Price, PriceUpdateRequest } from "../types/types";

export const updatedPrice = async (
    priceData: PriceUpdateRequest
): Promise<Price> => {
    return apiCall<Price>('post', '/updateprice', {
        data: priceData,
        errorNamespace: '.api.updateprice.price',
    });
};
