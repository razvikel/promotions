import axios from "axios";
import { Column, ColumnId, Promotion } from "./App.types";
import { v4 as uuid } from 'uuid';

export const getColumns = async (serverUrl: string): Promise<Column[]> => {
    const { data: columns } = await axios.get(`${serverUrl}/columns`);
    return columns;
}

export const getPromotions = async (serverUrl: string): Promise<Promotion[]> => {
    const { data: promotions } = await axios.get(`${serverUrl}/promotions`);
    return promotions;
}

export const removeColumn = async (serverUrl: string, _id: ColumnId) => {
    await axios.delete(`${serverUrl}/columns/${_id}`);
}

export const addColumn = async (serverUrl: string, column: Column) => {
    await axios.post(`${serverUrl}/columns`, { column })
}

export const initPromotions = async (serverUrl: string) => {
    await axios.post(`${serverUrl}/promotions/init`);
}

export const clearPromotions = async (serverUrl: string) => {
    await axios.delete(`${serverUrl}/promotions/clear`);
}

export const removePromotion = async (serverUrl: string, _id: string) => {
    await axios.delete(`${serverUrl}/promotions/${_id}`);
}

export const duplicatePromotion = async (serverUrl: String, promotion: Promotion) => {
    await axios.post(`${serverUrl}/promotions`, { promotion: { ...promotion, _id: uuid() } })
}

export const updatePromotion = async (serverUrl: String, promotion: Promotion) => {
    await axios.post(`${serverUrl}/promotions`, { promotion });
}