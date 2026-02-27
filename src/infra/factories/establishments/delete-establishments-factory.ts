import { deleteEstablishmentsUseCase } from '../../../application/establishments/delete-use-case.js';
import { establishmentRepository } from '../../../infra/repositories/supabase/establishments-repository.js';


export function deleteEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new deleteEstablishmentsUseCase(repo);
}
