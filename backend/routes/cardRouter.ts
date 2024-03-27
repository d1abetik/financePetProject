import { Router } from "express";
import cardController from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post('/create', cardController.create);
cardRouter.delete('/delete', cardController.delete);
cardRouter.patch('/update', cardController.update);
cardRouter.get('/get', cardController.get);
cardRouter.get('/getAll', cardController.getAll);

export default cardRouter;