import { Column } from "./Database/Column/Column";

export const DEFAULT_COLUMNS: Column[] = [
    {
        _id: 'Promotion name',
        type: 'string'
    },
    {
        _id: 'Type',
        type: 'string'
    },
    {
        _id: 'Start Date',
        type: 'date'
    },
    {
        _id: 'End Date',
        type: 'date'
    },
    {
        _id: 'User Group Name',
        type: 'string'
    }
];

export const INIT_AMOUNT = 10000;