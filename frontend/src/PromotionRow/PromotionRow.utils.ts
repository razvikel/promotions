import moment from "moment";
import { identity } from 'ramda';
import { Column, ColumnType, Promotion } from "../App/App.types";

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';

export const typesToFunctions: Record<ColumnType, (value: any) => string> = {
    string: identity,
    number: String,
    date: date => moment(date).format(DATE_FORMAT)
}

export const typesToFunctionsReversed: Record<ColumnType, (str: string) => any> = {
    string: identity,
    number: Number,
    date: str => moment(str, DATE_FORMAT).toDate()
}

export const typesToValidation: Record<ColumnType, (str: string) => boolean> = {
    string: str => true,
    number: x => !Number.isNaN(Number(x)),
    date: str => moment(str, DATE_FORMAT).format(DATE_FORMAT) === str

}

export const labelize = (value: any, type: ColumnType) => typesToFunctions[type](value);

export const isInvalid = (promotion: Promotion, columns: Column[]): boolean =>
    !columns.every(({ _id, type }) => typesToValidation[type](promotion[_id]));

export const matchToEdit = (promotion: Promotion, columns: Column[]): Promotion => {
    const newPromotion: any = {};
    columns.forEach(({_id, type}) => newPromotion[_id] = typesToFunctions[type](promotion[_id]));
    return {_id: promotion._id, ...newPromotion};
}

export const matchToSubmit = (promotion: Promotion, columns: Column[]): Promotion => {
    const newPromotion: any = {};
    columns.forEach(({_id, type}) => newPromotion[_id] = typesToFunctionsReversed[type](promotion[_id]));
    return {_id: promotion._id, ...newPromotion};
}