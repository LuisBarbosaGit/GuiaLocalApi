import { FastifyInstance } from 'fastify';
import z from 'zod';
import { getAllCategoryFactory } from '../../infra/factories/categories/get-all-category-factory.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createCategoryFactory } from '../../infra/factories/categories/create-category-factory.js';
import { deleteCategoryFactory } from '../../infra/factories/categories/delete-category-factory.js';
import { updateCategoryFactory } from '../../infra/factories/categories/update-category-factory.js';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../../domain/repositories/categories.js';

export const categoriesRouter = (app: FastifyInstance) => {
  app.get('/categories', async (request, reply) => {
    const useCase = getAllCategoryFactory();

    const categories = await useCase.execute();

    reply.code(200).send(categories);
  });

  app.withTypeProvider<ZodTypeProvider>().post(
    '/categories',
    {
      schema: {
        body: createCategorySchema,
      },
    },
    async (request, reply) => {
      const { name } = request.body;

      const useCase = createCategoryFactory();

      const data = await useCase.execute(name);

      reply.code(201).send(data);
    },
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/categories/:id',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const useCase = deleteCategoryFactory();

      await useCase.execute(id);

      reply.code(204).send('Category deleted successfully');
    },
  );

  app.withTypeProvider<ZodTypeProvider>().put(
    '/categories/:id',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
        body: updateCategorySchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name } = request.body;

      const useCase = updateCategoryFactory();
      const data = await useCase.execute(id, name);

      reply.code(200).send(data);
    },
  );
};
