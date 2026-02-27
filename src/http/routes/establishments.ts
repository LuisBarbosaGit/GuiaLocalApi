import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { createEstablishmentFactory } from '../../infra/factories/establishments/create-establishments-factory.js';
import { getAllEstablishmentsFactory } from '../../infra/factories/establishments/getAll-establishments-factory.js';
import { getByIdEstablishmentByIdFactory } from '../../infra/factories/establishments/get-by-id-establishments-use-case.js';
import { getByCategoryEstablishmentFactory } from '../../infra/factories/establishments/get-by-category-factory.js';
import { deleteEstablishmentFactory } from '../../infra/factories/establishments/delete-establishments-factory.js';
import { editEstablishmentFactory } from '../../infra/factories/establishments/edit-establishments-factory.js';
import {
  createEstablishmentSchema,
  establishmentsType,
} from '../../domain/establishments/schemas.js';
import { updateEstablishmentsSchema } from '../../domain/establishments/schemas.js';

import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const establishmentsRouter = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/establishments',
    {
      schema: {
        body: createEstablishmentSchema,
      },
    },
    async (
      request: FastifyRequest<{ Body: establishmentsType }>,
      reply: FastifyReply,
    ) => {
      const useCase = createEstablishmentFactory();
      const data = await useCase.execute(request.body);

      reply.code(201).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.get('/establishments', async (_, reply: FastifyReply) => {
    const useCase = getAllEstablishmentsFactory();
    const data = await useCase.execute();

    reply.code(201).send({
      message: 'sucess',
      data: data,
    });
  });

  app.withTypeProvider<ZodTypeProvider>().get(
    '/establishments/:id',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const useCase = getByIdEstablishmentByIdFactory();
      const data = await useCase.execute(id);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    '/establishments/categories/:id',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const useCase = getByCategoryEstablishmentFactory();

      const data = await useCase.execute(id);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/establishments/:id',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const useCase = deleteEstablishmentFactory();

      const data = await useCase.execute(id);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.withTypeProvider<ZodTypeProvider>().put(
    '/establishments/:id',
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
        body: updateEstablishmentsSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const item = request.body as establishmentsType;

      const useCase = editEstablishmentFactory();

      const data = await useCase.execute(id, item);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );
};

export default establishmentsRouter;
