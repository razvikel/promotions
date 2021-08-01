import { Router } from "express"
import { PromotionModel } from "../types";
import { addColumnHandler, getColumnsHandler, removeColumnHandler } from "./Columns.handlers";

export const createColumnsRouter = (promotionModel: PromotionModel) => {
    const router = Router();
    router.get('/', getColumnsHandler);
    router.post('/', addColumnHandler(promotionModel));
    router.delete('/:_id', removeColumnHandler(promotionModel));
    return router;
}