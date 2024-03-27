import Router from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/reg', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.patch('/update', userController.update);
userRouter.delete('/delete', userController.delete);
userRouter.get('/get', userController.get);

export default userRouter;