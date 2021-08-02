import { generatedValue, Promotion, PromotionModel } from "../../types";
import { Column } from "../Column/Column";

export const addPromotions = async (promotionModel: PromotionModel, promotions: Promotion[]) => promotionModel.insertMany(promotions);

export const addField = async (promotionModel: PromotionModel, column: Column) => promotionModel.updateMany({}, { $set: { [column._id]: generatedValue(column.type, 0) } }, { multi: true });

export const updatePromotion = async (promotionModel: PromotionModel, promotion: Promotion) => promotionModel.findByIdAndUpdate(promotion._id, { $set: promotion }, { upsert: true });

export const removePromotion = async (promotionModel: PromotionModel, _id: string) => promotionModel.findByIdAndRemove(_id);

export const removeAllPromotions = async (promotionModel: PromotionModel) => promotionModel.remove({});

export const getPromotions = async (promotionModel: PromotionModel, skip: number, limit: number): Promise<Promotion[]> => promotionModel.find({}).skip(skip).limit(limit);
