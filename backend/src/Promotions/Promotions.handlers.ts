import { Request, Response } from "express";
import { INIT_AMOUNT } from "../consts";
import { addPromotions, getPromotions, removeAllPromotions, removePromotion, updatePromotion } from "../Database/Promotion/Promotion.dal";
import { isGetPromotionsRequestQuery, isUpdatePromotionRequestBody } from "../typeguards";
import { PromotionGenerator, PromotionModel } from "../types";

export const getPromotionsHandler = (promotionModel: PromotionModel) => async (req: Request, res: Response) => {
    if (isGetPromotionsRequestQuery(req.query)) {
        const { skip, limit } = req.query;
        const promotions = await getPromotions(promotionModel, Number(skip), Number(limit));
        res.send(promotions);
    } else {
        res.sendStatus(400);
    }
}

export const promotionsInitializationHandler = (promotionModel: PromotionModel, promotionGenerator: PromotionGenerator) => async (req: Request, res: Response) => {
    const promotions = promotionGenerator(INIT_AMOUNT);
    await addPromotions(promotionModel, promotions);
    res.send();
}

export const clearPromotionsHandler = (promotionModel: PromotionModel) => async (req: Request, res: Response) => {
    await removeAllPromotions(promotionModel);
    res.send();
}

export const removePromotionHandler = (promotionModel: PromotionModel) => async (req: Request, res: Response) => {
    const { _id } = req.params;
    removePromotion(promotionModel, _id);
    res.send();
}

export const updatePromotionHandler = (promotionModel: PromotionModel) => async (req: Request, res: Response) => {
    if (isUpdatePromotionRequestBody(req.body)) {
        const { promotion } = req.body;
        await updatePromotion(promotionModel, promotion);
        res.send();
    } else {
        res.sendStatus(400);
    }
}