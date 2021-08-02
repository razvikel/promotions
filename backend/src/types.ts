import { Model } from "mongoose";
import { Column } from "./Database/Column/Column";

export type ColumnType = 'string' | 'number' | 'date';

export const columnTypeToConstructor: Record<ColumnType, unknown> = {
    string: String,
    number: Number,
    date: Date
}

export const generatedValue = (type: ColumnType, index: number) => ({
    string: `default ${index}`,
    number: 0,
    date: new Date()
})[type];

export type Promotion = { _id: string };

export type PromotionModel = Model<Promotion>;

export type PromotionGenerator = (amount: number) => Promotion[];

export interface CreateColumnRequestBody {
    column: Column;
}

export interface UpdatePromotionRequestBody {
    promotion: Promotion;
}

export interface GetPromotionsRequestQuery {
    skip: string;
    limit: string;
}