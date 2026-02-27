import { getEstablishmentsByCategoryUseCase } from '../../../application/establishments/get-by-category-use-case.js';
import { establishmentRepository } from '../../../infra/repositories/supabase/establishments-repository.js';

export function getByCategoryEstablishmentFactory() {
  const repo = new establishmentRepository();
  return new getEstablishmentsByCategoryUseCase(repo);
}
