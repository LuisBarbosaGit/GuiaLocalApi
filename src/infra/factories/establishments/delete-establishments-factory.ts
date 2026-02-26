import { deleteEstablishmentsUseCase } from '@/application/establishments/delete-use-case';
import { establishmentRepository } from '@/infra/repositories/supabase/establishments-repository';


export function deleteEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new deleteEstablishmentsUseCase(repo);
}
