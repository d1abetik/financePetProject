import { Request, Response } from "express";
import userService from '../service/user-service';
// import ApiError from "../error/ApiError";

class UserController {
  async createUser(req: Request, res: Response) {
    const { email, password, username } = req.body;

    try {
      const newUser = await userService.createUser(email, password, username);
      res.status(201).json(newUser);
    } catch(error) {
      console.log(error);
      res.status(500).json({ error: 'Error' })
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    
    try {
      const user = await userService.login(username, password);

      if (!user) {
        return res.status(404).json({message: user});
      }

      return res.status(201).json({user})
    } catch(error) {
      console.log(error);
      res.status(500).json({error: 'Error during login'})
    }
  }

  async update(req: Request, res: Response) {
    const {email, username, id, password} = req.body;

    try {
      const data = await userService.update(email, username, password, id)
      res.status(201).json(data);
    } catch(error) {
      res.status(501).json({message: error});
    }
  }

  async get(req:Request, res:Response) {
    const {username} = req.body

    try {
      const user = await userService.get(username);
      if (!user) {
        return res.status(401).json({message: 'Not found!'});
      }
      res.status(201).json(user);
    } catch(error) {
      console.log(error)
      res.status(501).json({message:error})
    }
  }

  async delete(req:Request, res: Response) {
    const {id, username} = req.body;

    try {
      await userService.delete(id, username);
      res.status(201).json({message:"Done person was deleted!"});
    } catch(error) {
      res.status(500).json({message:error});
    }
  }

}

const userController = new UserController

export default userController;