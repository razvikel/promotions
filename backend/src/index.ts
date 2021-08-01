import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createColumnsRouter } from './Columns/Columns.router';
import { DEFAULT_COLUMNS } from './consts';
import { addColumn } from './Database/Column/Column.dal';
import { Database } from './Database/Database';
import { generatePromotionModelandGenerator } from './Database/Promotion/Promotion';
import { createPromotionsRouter } from './Promotions/Promotions.router';

const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

Database.connect().then(async () => {
    await Promise.all(DEFAULT_COLUMNS.map(addColumn));
    const { promotionModel, promotionGenerator } = await generatePromotionModelandGenerator();
    app.use('/columns', createColumnsRouter(promotionModel));
    app.use('/promotions', createPromotionsRouter(promotionModel, promotionGenerator));
});


app.listen(port, () => console.log(`server is listening on ${port}`));