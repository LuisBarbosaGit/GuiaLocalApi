
import { createEstablishmentUseCase } from '../../../application/establishments/create-use-case.js';
import { establishmentRepository } from '../../..//infra/repositories/supabase/establishments-repository.js';


export function createEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new createEstablishmentUseCase(repo);
}
