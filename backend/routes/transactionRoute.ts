import Router from 'express';
import transController from '../controllers/transactionController';

const transRouter = Router();

transRouter.post('/create', transController.create);
transRouter.delete('/delete', transController.delete);
transRouter.get('/getAll', transController.getAll);

export default transRouter;