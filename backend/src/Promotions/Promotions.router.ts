import { Router } from "express"
import { PromotionModel, PromotionGenerator } from "../types";
import { clearPromotionsHandler, getPromotionsHandler, promotionsInitializationHandler, removePromotionHandler, updatePromotionHandler } from "./Promotions.handlers";

export const createPromotionsRouter = (promotionModel: PromotionModel, promotionGenerator: PromotionGenerator) => {
    const router = Router();
    router.get('/', getPromotionsHandler(promotionModel))
    router.post('/init', promotionsInitializationHandler(promotionModel, promotionGenerator));
    router.delete('/clear', clearPromotionsHandler(promotionModel));
    router.delete('/:_id', removePromotionHandler(promotionModel));
    router.post('/', updatePromotionHandler(promotionModel));
    return router;
}