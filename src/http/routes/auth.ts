import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  createUserSchema,
  loginUserSchema,
  refreshUserSchema,
} from '../../domain/repositories/user.js';

export const authRoutes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        body: createUserSchema,
      },
    },
    async () => {},
  );
  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        body: loginUserSchema,
      },
    },
    async () => {},
  );
  app.withTypeProvider<ZodTypeProvider>().post(
    '/refresh',
    {
      schema: {
        body: refreshUserSchema,
      },
    },
    async () => {},
  );
};
