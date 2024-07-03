import { Response, Router } from 'express';
import * as mockService from '../util/mock/import';

const mockRouter = () => {
  const router = Router();

  router.get('/api/mock-activity', async (req, res: Response) => {
    /* #swagger.tags = ['Mock'] */
    const limit = req.query.limit;
    const quantity =
      limit && Number.isInteger(+limit) && +limit > 1 ? +limit : 1;
    await mockService.importRandomMockActivity(quantity);

    res.send(`success create ${quantity} activities`);
  });

  router.get('/mock-data', async (_, res: Response) => {
    /* #swagger.tags = ['Mock'] */
    await mockService.importMockKeyword();
    await mockService.importMockUser();
    await mockService.importMockOrganizer();
    await mockService.importMockComment();
    await mockService.importMockActivity();
    await mockService.importMockTicket();
    await mockService.importMockParticipant();
    await mockService.importMockOrder();
    await mockService.importMockMessageList();
    await mockService.updateSoldTickets();

    res.send('success create mock data');
  });

  return router;
};

const mockRoute = mockRouter();

export default mockRoute;
