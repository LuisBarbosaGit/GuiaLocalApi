import establishmentRepository from '../../repositories/establishments';
import { establishmentsSchema } from '@/types/establishments';
import { FastifyRequest, FastifyReply } from 'fastify';

class establishmentService {
  static createEstablishment = async (
    request: FastifyRequest<{ Body: establishmentsSchema }>,
    reply: FastifyReply,
  ) => {
    const establishment = request.body;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!establishment) {
      reply.status(400).send({
        error: 'invalid data',
      });
    }

    const { name, description, category_id } = establishment;

    if (!name || !category_id || !description) {
      reply.status(400).send({
        error: 'VALIDATION_ERROR',
        message : 'Required fields are missing'
      });
    }

    const isValidUuid = uuidRegex.test(category_id);

    if (!isValidUuid) {
      reply.status(400).send({
        error: 'VALIDATION_ERROR',
        message: 'category id is not valid',
      });
    }

    try {
      const response =
        establishmentRepository.createEstablishment(establishment);
      reply.status(200).send(response);
    } catch (error: any) {
      reply.status(400).send({
        error: error.messsage,
      });
    }
  };
}

export default establishmentService;
