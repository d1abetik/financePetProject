import { Request, Response } from "express";
import transService from "../service/transaction-service";

class TransController {
  async create(req: Request, res: Response) {
    const { amount, goal, nameTrans, userId, cardId, cardName, userName, type } = req.body;

    try {
      const newCard = await transService.create(amount, goal, nameTrans, cardId, cardName, userId, userName, type);
      res.status(201).json(newCard);
    } catch(error:any) {
      res.status(500).json({error: error.message})
    }
  }

  async delete(req: Request, res: Response) {
    const {id, userId, transactionId} = req.body;

    try {
      const emptyCard = await transService.delete(id, userId, transactionId);
      res.status(201).json(emptyCard);
    } catch(error) {
      console.log(error);
      res.status(500).json({message: error})
    }
  }

  async getAll(req: Request, res: Response) {
    const { userId, cardId } = req.body;

    try {
      const transactions = await transService.getAll(cardId, userId);
      if (!transactions) {
        return res.status(401).json({message:'not found'});
      }
      res.status(201).json(transactions);
    } catch(error) {
      return res.status(501).json({message: error});
    }

  }
}

const transController = new TransController

export default transController;