import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { establishmentsSchema } from '@/domain/establishments/type';
import { createEstablishmentUseCase } from '@/application/establishments/createEstablishmentsUseCase';
import { establishmentRepository } from '@/infra/repositories/establishmentsRepository';
import { selectEstablishmentsUseCase } from '@/application/establishments/selectEstablishmentsUseCase';

const establishmentsRouter = (app: FastifyInstance) => {
  app.post(
    '/establishments',
    async (
      request: FastifyRequest<{ Body: establishmentsSchema }>,
      reply: FastifyReply,
    ) => {
      const repo = new establishmentRepository();
      const useCase = new createEstablishmentUseCase(repo);
      const data = await useCase.execute(request.body);

      reply.code(201).send(data);
    },
  );

  app.get('/establishments', async(request : FastifyRequest, reply: FastifyReply) => {
    const repository = new establishmentRepository();
    const useCase = new selectEstablishmentsUseCase(repository);

    const data = await useCase.execute();

    reply.code(201).send(data);
  });
};

export default establishmentsRouter;
