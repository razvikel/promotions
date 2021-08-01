import { Request, Response } from "express";
import { addColumn, getColumns, removeColumn } from "../Database/Column/Column.dal";
import { isCreateColumnRequestBody } from "../typeguards";
import { columnTypeToConstructor, PromotionModel } from "../types";
import * as mongooseDynamic from 'mongoose-dynamic-schemas';
import { addField } from "../Database/Promotion/Promotion.dal";

export const getColumnsHandler = async (req: Request, res: Response) => {
    const columns = await getColumns();
    res.send(columns);
}

export const addColumnHandler = (promotionModel: PromotionModel) => async (req: Request, res: Response) => {
    if (isCreateColumnRequestBody(req.body)) {
        const { column } = req.body;
        await addColumn(column);
        await mongooseDynamic.addSchemaField(promotionModel, column._id, columnTypeToConstructor[column.type]);
        await addField(promotionModel, column);
        res.send();
    } else {
        res.sendStatus(400);
    }
}

export const removeColumnHandler = (promotionModel: PromotionModel) => async (req: Request, res: Response) => {
    const { _id } = req.params;
    await removeColumn(_id);
    await mongooseDynamic.removeSchemaField(promotionModel, _id);
    res.send();
}