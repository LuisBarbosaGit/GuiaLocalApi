import Fastify, { FastifyError } from 'fastify';
import 'dotenv/config';
import establishmentsRouter from './http/routes/establishments.js';
import { AppError } from './shared/errors/AppError.js';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const app = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '192.168.15.7' });
    console.log('server is Running');
  } catch (error) {
    app.log.error(error);
  }
};

start();

app.register(establishmentsRouter);

app.setErrorHandler((error: FastifyError | AppError, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.code).send({
      status: error.status,
      details: error.details,
    });
  }

  if (error.validation) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.validation,
    });
  }

  console.log(error);

  return reply.status(500).send({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected error',
  });
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
