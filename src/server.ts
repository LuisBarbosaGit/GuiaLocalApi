import Fastify, { FastifyError } from 'fastify';
import 'dotenv/config';
import { AppError } from './shared/errors/AppError.js';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import {
  establishmentsRouter,
  categoriesRouter,
} from './http/routes/routes.js';

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const app = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await app.register(swagger, {
      openapi: {
        info: {
          title: 'API de Estabelecimentos',
          description:
            'API para gerenciamento de estabelecimentos e categorias',
          version: '1.0.0',
        },
      },
    });

    await app.register(swaggerUi, {
      routePrefix: '/docs',
    });
    await app.listen({ port: 3000 });
    console.log('server is Running');
  } catch (error) {
    app.log.error(error);
  }
};

start();

app.register(establishmentsRouter);
app.register(categoriesRouter);

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
