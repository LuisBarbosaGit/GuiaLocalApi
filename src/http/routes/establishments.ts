import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { createEstablishmentFactory } from '../../infra/factories/establishments/create-establishments-factory.js';
import { getAllEstablishmentsFactory } from '../../infra/factories/establishments/getAll-establishments-factory.js';
import { getByIdEstablishmentByIdFactory } from '../../infra/factories/establishments/get-by-id-establishments-use-case.js';
import { getByCategoryEstablishmentFactory } from '../../infra/factories/establishments/get-by-category-factory.js';
import { deleteEstablishmentFactory } from '../../infra/factories/establishments/delete-establishments-factory.js';
import { editEstablishmentFactory } from '../../infra/factories/establishments/edit-establishments-factory.js';
import {
  createEstablishmentSchema,
  createEstablishmentSchemaResponse,
  establishmentsType,
} from '../../domain/repositories/establishments.js';
import { updateEstablishmentsSchema } from '../../domain/repositories/establishments.js';

import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export const establishmentsRouter = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/establishments',
    {
      schema: {
        body: createEstablishmentSchema,
        response: {
          201: createEstablishmentSchemaResponse,
        },
      },
    },
    async (request, reply) => {
      const item = request.body;
      const useCase = createEstablishmentFactory();
      const data = await useCase.execute(item);

      reply.code(201).send(data);
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    '/establishments',
    {
      schema: {
        response: {
          200: z.array(createEstablishmentSchemaResponse),
        },
      },
    },
    async (_, reply: FastifyReply) => {
      const useCase = getAllEstablishmentsFactory();
      const data = await useCase.execute();

      reply.code(200).send(data);
    },
  );

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

      reply.code(200).send(data);
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

      reply.code(200).send(data);
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

      reply.code(200).send(data);
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

      reply.code(200).send(data);
    },
  );
};
