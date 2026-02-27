import { EditEstablishmentsByIdUseCase } from '../../../application/establishments/edit-by-id-use-case.js';
import { establishmentRepository } from '../../../infra/repositories/supabase/establishments-repository.js';

export function editEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new EditEstablishmentsByIdUseCase(repo);
}
