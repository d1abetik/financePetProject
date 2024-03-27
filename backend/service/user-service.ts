import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async createUser(email:string, password:string, username:string) {
    const userEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });

    const nameUser = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if (userEmail || nameUser) {
      throw new Error(`User exist with ${email} or ${nameUser}`);
    };

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email
      }
    });

    return newUser;
  }

  async login(username:string, password:string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
        password
      }
    });
    if (!user) {
      return new Error('Invalid password or username');
    }
    return user;
  }

  async update(email:string, username:string, password:string, id:number) {
    const data = await prisma.user.update({
      where: {
        id
      },
      data: {
        password,
        username,
        email
      }
    })
    return data;
  }

  async get(username:string) {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    return user;
  }

  async delete(id?:number, username?:string) {
    await prisma.user.delete({
      where: {
        id,
        username
      }
    });
  }
}

const userService = new UserService;

export default userService;