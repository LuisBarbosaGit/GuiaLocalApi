import { getEstablishmentByIdUseCase } from '../../../application/establishments/get-by-id-use-case.js';
import { establishmentRepository } from '../../../infra/repositories/supabase/establishments-repository.js';

export const getByIdEstablishmentByIdFactory = () => {
  const repository = new establishmentRepository();
  return new getEstablishmentByIdUseCase(repository);
};
