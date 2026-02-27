import { getAllEstablishmentsUseCase } from '../../../application/establishments/get-all-use-case.js';
import { establishmentRepository } from '../../../infra/repositories/supabase/establishments-repository.js';

export const getAllEstablishmentsFactory = () => {
  const repo = new establishmentRepository();
  return new getAllEstablishmentsUseCase(repo);
};
