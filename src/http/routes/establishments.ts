import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { establishmentsSchema } from '@/domain/establishments/type';
import { createEstablishmentFactory } from '@/infra/factories/establishments/create-establishments-factory';
import { getAllEstablishmentsFactory } from '../../infra/factories/establishments/getAll-establishments-factory';
import { getByIdEstablishmentByIdFactory } from '@/infra/factories/establishments/get-by-id-establishments-use-case';
import { getByCategoryEstablishmentFactory } from '@/infra/factories/establishments/get-by-category-factory';
import { deleteEstablishmentFactory } from '@/infra/factories/establishments/delete-establishments-factory';
import { editEstablishmentFactory } from '@/infra/factories/establishments/edit-establishments-factory';

const establishmentsRouter = (app: FastifyInstance) => {
  app.post(
    '/establishments',
    async (
      request: FastifyRequest<{ Body: establishmentsSchema }>,
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

  app.get(
    '/establishments/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id = request.id;
      const useCase = getByIdEstablishmentByIdFactory();
      const data = await useCase.execute(id);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.get(
    'establishments/categories/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const categoryId = request.id;
      const useCase = getByCategoryEstablishmentFactory();

      const data = await useCase.execute(categoryId);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.delete(
    'establishments/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id = request.id;
      const useCase = deleteEstablishmentFactory();

      const data = await useCase.execute(id);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );

  app.put(
    'establishments/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const item = request.body as establishmentsSchema;

      const useCase = editEstablishmentFactory();

      const data = useCase.execute(item);

      reply.code(200).send({
        message: 'sucess',
        data: data,
      });
    },
  );
};

export default establishmentsRouter;
