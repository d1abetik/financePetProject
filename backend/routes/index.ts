import { Router } from "express";
import cardRouter from "./cardRouter";
import transRouter from "./transactionRoute";
import userRouter from "./userRouter";

const router = Router();

router.use('/u', userRouter);
router.use('/c', cardRouter);
router.use('/tr', transRouter);

export default router;