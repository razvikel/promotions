import { model, Schema } from 'mongoose';
import { fromPairs, range } from 'ramda';
import { v4 as uuid } from 'uuid';
import { columnTypeToConstructor, generatedValue, Promotion, PromotionGenerator, PromotionModel } from '../../types';
import { Column } from '../Column/Column';
import { getColumns } from '../Column/Column.dal';
import * as mongooseDynamic from 'mongoose-dynamic-schemas';

export const generatePromotionModelandGenerator = async (): Promise<{ promotionModel: PromotionModel, promotionGenerator: PromotionGenerator }> => {
    const columns: Column[] = await getColumns();
    const promotionSchema = new Schema({ _id: String }, { versionKey: false });
    const promotionModel = model<Promotion>('Promotion', promotionSchema);

    for (let column of columns) {
        await mongooseDynamic.addSchemaField(promotionModel, column._id, columnTypeToConstructor[column.type]);
    }

    const promotionGenerator = (amount: number) => range(0, amount).map(index =>
        ({ _id: uuid(), ...fromPairs(columns.map(({ _id, type }) => [_id, generatedValue(type, index)])) })
    );

    return {
        promotionModel,
        promotionGenerator
    }
}