import { model, Model, Schema } from 'mongoose';
import { ColumnType } from '../../types';

export type ColumnId = string;

export interface Column {
    _id: ColumnId;
    type: ColumnType;
}

const ColumnSchema = new Schema({
    _id: String,
    type: String
}, { versionKey: false });

export const ColumnModel: Model<Column> = model('Column', ColumnSchema);