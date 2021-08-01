import { identity } from "ramda";
import { Column } from "./Database/Column/Column";
import { columnTypeToConstructor, CreateColumnRequestBody, UpdatePromotionRequestBody } from "./types";

const isColumn = (obj: any): obj is Column => obj?._id?.length > 0 && Object.keys(columnTypeToConstructor).includes(obj?.type);

export const isCreateColumnRequestBody = (body: any): body is CreateColumnRequestBody => isColumn(body?.column);

export const isUpdatePromotionRequestBody = (body: any): body is UpdatePromotionRequestBody => identity(body?.promotion?._id); 
