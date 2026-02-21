import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { establishmentsSchema } from "@/domain/establishments/type";
import { createEstablishmentUseCase } from "@/application/establishments/createEstablishmentsUseCase";
import { establishmentRepository } from "@/infra/repositories/establishmentsRepository";

const establishmentsRouter = (app: FastifyInstance) => {
  app.post(
    "/establishments",
    async (
      request: FastifyRequest<{ Body: establishmentsSchema }>,
      reply: FastifyReply,
    ) => {
      const repo = new establishmentRepository();
      const useCase = new createEstablishmentUseCase(repo);
      const data = await useCase.execute(request.body);

      reply.send(data);
    },
  );
};

export default establishmentsRouter;
