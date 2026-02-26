import { getEstablishmentsByCategoryUseCase } from '@/application/establishments/get-by-category-use-case';
import { establishmentRepository } from '@/infra/repositories/supabase/establishments-repository';

export function getByCategoryEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new getEstablishmentsByCategoryUseCase(repo);
}
