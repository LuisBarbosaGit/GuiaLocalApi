import { EditEstablishmentsByIdUseCase } from '@/application/establishments/edit-by-id-use-case';
import { establishmentRepository } from '@/infra/repositories/supabase/establishments-repository';


export function editEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new EditEstablishmentsByIdUseCase(repo);
}
