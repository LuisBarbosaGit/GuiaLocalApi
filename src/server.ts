import Fastify from 'fastify';
import 'dotenv/config';
import establishmentsRouter from './routes/establishments';

const app = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '192.168.15.5' });
    console.log('server is Running');
  } catch (error) {
    app.log.error(error);
  }
};

start();

app.register(establishmentsRouter);
