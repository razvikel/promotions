import { identity } from "ramda";
import { Column } from "./Database/Column/Column";
import { columnTypeToConstructor, CreateColumnRequestBody, GetPromotionsRequestQuery, UpdatePromotionRequestBody } from "./types";

const isColumn = (obj: any): obj is Column => obj?._id?.length > 0 && Object.keys(columnTypeToConstructor).includes(obj?.type);

export const isCreateColumnRequestBody = (body: any): body is CreateColumnRequestBody => isColumn(body?.column);

export const isUpdatePromotionRequestBody = (body: any): body is UpdatePromotionRequestBody => identity(body?.promotion?._id); 

const isInteger = str => !isNaN(str) && (Number(str) % 1 === 0);

export const isGetPromotionsRequestQuery = (query: any): query is GetPromotionsRequestQuery => isInteger(query.skip) && isInteger(query.limit);