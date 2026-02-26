import { createEstablishmentUseCase } from '@/application/establishments/create-use-case';
import { establishmentRepository } from '@/infra/repositories/supabase/establishments-repository';


export function createEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new createEstablishmentUseCase(repo);
}
