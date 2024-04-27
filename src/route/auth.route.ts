import { Request, Response, Router } from 'express';
import * as AuthService from '../service/auth.service';

const authRoute = () => {
  const router = Router();

  router.post('/register', async (req: Request, res: Response) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).send(user);
    } catch {
      res.status(400).send('Registration failed');
    }
  });

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const token = await AuthService.login(req.body);
      res.status(200).send({ token });
    } catch {
      res.status(401).send('Login failed');
    }
  });

  return router;
};

export default authRoute;
