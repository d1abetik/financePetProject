import { Request, Response } from "express";
import cardService from '../service/card-service';

class CardController {
  async create(req: Request, res: Response) {
    const { name, balance, color, userId, type, goal } = req.body;

    try {
      const newCard = await cardService.create(name, balance, color, userId, type, goal);
      res.status(201).json(newCard);
    } catch(error:any) {
      res.status(500).json({error: error.message})
    }
  }

  async delete(req: Request, res: Response) {
    const {params} = req.body;
    const id = params.id;
    const userId = params.userId;

    try {
      const emptyCard = await cardService.delete(id, userId);
      res.status(201).json(emptyCard);
    } catch(error) {
      console.log(error);
      res.status(500).json({message: error})
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      const card = await cardService.get(id);

      if (!card) {
        return res.status(401).json({message: 'not found'})
      }
      res.status(201).json(card);
    } catch(error) {
      return res.status(501).json({message:error})
    }
  }

  async getAll(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      const cards = await cardService.getAll(userId);
      if (!cards) {
        return res.status(401).json({message:'not found'})
      }
      res.status(201).json(cards);
    } catch(error) {
      return res.status(501).json({message: error});
    }

  }

  async update(req: Request, res: Response) {
    const { userId, goal, name, color, id, transactions  } = req.body

    try {
      const updatedCard = await cardService.update(name, id, color, goal, userId);
      res.status(201).json(updatedCard);
    } catch(error) {
      res.status(501).json({message: error});
    }
  }
}

const cardController = new CardController

export default cardController;