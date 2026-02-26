
import { getEstablishmentByIdUseCase } from '@/application/establishments/get-by-id-use-case';
import { establishmentRepository } from '@/infra/repositories/supabase/establishments-repository';


export const getByIdEstablishmentByIdFactory = () => {
  const repository = new establishmentRepository();
  return new getEstablishmentByIdUseCase(repository);
};
