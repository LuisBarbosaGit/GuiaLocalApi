import { getAllEstablishmentsUseCase } from '@/application/establishments/get-all-use-case';
import { establishmentRepository } from '@/infra/repositories/supabase/establishments-repository';


export const getAllEstablishmentsFactory = () => {
  const repo = new establishmentRepository();
  return new getAllEstablishmentsUseCase(repo);
};
