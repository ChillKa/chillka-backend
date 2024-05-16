import { Request, Response, Router } from 'express';
import swaggerDocument from '../swagger/swagger-output.json';

const swaggerRouter = () => {
  const router = Router();

  router.get('/swagger.json', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  return router;
};
const swaggerRoute = swaggerRouter();

export default swaggerRoute;
