import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionsController';

const sessionnsRouter = Router();
const sessionnsControle = new SessionController();

// Rota: Recever a requisição, chamar outro arquivo e devolver uma resposta

sessionnsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionnsControle.create,
);

export default sessionnsRouter;
