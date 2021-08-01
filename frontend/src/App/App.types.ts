export type Promotion = {
    _id: string;
};

export type ColumnId = keyof Promotion;

export type ColumnType = 'string' | 'number' | 'date';

export interface Column {
    _id: ColumnId;
    type: ColumnType;
}
