import { Router } from 'express';
import SessionController from '@modules/users/infra/http/controllers/SessionsController';

const sessionnsRouter = Router();
const sessionnsControle = new SessionController();

// Rota: Recever a requisição, chamar outro arquivo e devolver uma resposta

sessionnsRouter.post('/', sessionnsControle.create);

export default sessionnsRouter;
