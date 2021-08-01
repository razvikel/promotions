import { Column, ColumnId, ColumnModel } from "./Column";

export const addColumn = async (column: Column) => ColumnModel.findByIdAndUpdate(column._id, { $set: column }, { upsert: true });

export const getColumns = async (): Promise<Column[]> => ColumnModel.find({});

export const removeColumn = async (_id: ColumnId) => ColumnModel.findByIdAndRemove(_id);