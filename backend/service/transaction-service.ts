import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TransService {
  async create (amount: number, goal: number, nameTrans: string, cardId: number, cardName: string, userId: number, userName: string, type:string) {
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        goal,
        nameTrans,
        cardId,
        cardName,
        userId,
        userName,
        type,
      }
    });
    return newTransaction
  }

  async getAll (cardId:number, userId: number) {
    const transactions = await prisma.transaction.findMany({
      where: {
        cardId,
        userId
      }
    });
    return transactions;
  }

  async delete (cardId: number, userId: number, transactionId: number) {
    await prisma.transaction.delete({
      where: {
        cardId,
        userId,
        id: transactionId
      }
    });
    return {message: 'succesfully deleted'};
  }
};

const transService = new TransService;

export default transService;