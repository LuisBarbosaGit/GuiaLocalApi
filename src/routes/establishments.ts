import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify'
import establishmentService from '../services/establishments/establishments'
import { establishmentsSchema } from '@/types/establishments'

const establishmentsRouter = (app: FastifyInstance) => {
    app.post('/establishments', async (request : FastifyRequest<{Body : establishmentsSchema}>, reply : FastifyReply) => {
        return establishmentService.createEstablishment(request, reply);
    })
}


export default establishmentsRouter