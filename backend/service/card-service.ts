import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CardService {
  async create(name:string, balance:string, color:string, userId:number, type: string, goal:number) {
    const newCard = await prisma.card.create({
      data: {
        name,
        balance,
        color,
        userId,
        type,
        goal
      }
    });
    return newCard;
  }

  async delete(id:number, userId:number) {
    await prisma.card.delete({
      where: {
        id,
        userId
      }
    });
    return {message: 'successfully was deleted'};
  }

  async get(id:number) {
    const card = await prisma.card.findUnique({
      where: {
        id
      },
      include: {
        history: true
      }
    });
    return card;
  }

  async getAll(userId:number) {
    const cards = await prisma.card.findMany({
      where: {
        userId
      },
      include: {
        history: true
      }
    });
    return cards;
  }

  async update(
    name: string,
    id: number,
    color: string,
    goal: number,
    userId: number
  ) {
      const updatedCard = await prisma.card.update({
        where: {
          id,
          userId
        },
        data: {
          name,
          color,
          goal
        }
      });
  
      return updatedCard;
  }
}

const cardService = new CardService;

export default cardService;