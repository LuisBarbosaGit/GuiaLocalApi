import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  createreviewsSchema,
  deletereviewsSchema,
  editreviewsSchema,
} from '../../domain/repositories/reviews.js';
import { createReviewsFactory } from '../../infra/factories/reviews/create-review-factory.js';
import z from 'zod';
import { editReviewsFactory } from '../../infra/factories/reviews/edit-review-factory.js';
import { deleteReviewsFactory } from '../../infra/factories/reviews/delete-review-factory.js';

export const reviewsRouter = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/reviews',
    {
      schema: {
        body: createreviewsSchema,
      },
    },
    async (request, reply) => {
      const item = request.body;
      const useCase = createReviewsFactory();

      const response = await useCase.execute(item);

      reply.code(204).send(response);
    },
  );
  app.withTypeProvider<ZodTypeProvider>().put(
    '/reviews',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
        body: editreviewsSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const item = {
        ...request.body,
        id: id,
      };

      const useCase = editReviewsFactory();

      const response = await useCase.execute(item);

      reply.code(204).send(response);
    },
  );
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/reviews',
    {
      schema: {
        params: deletereviewsSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const useCase = deleteReviewsFactory();

      const response = await useCase.execute(id);

      reply.code(204).send(response);
    },
  );
};
