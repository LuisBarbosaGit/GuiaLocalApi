import { establishmentsSchema } from '@/domain/establishments/type';
import { establishmentRepositorySchema } from '@/infra/repositories/supabase/establishments-repository';


export class EditEstablishmentsByIdUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(item: establishmentsSchema) {
    //To do: Add token and pagination
    try {
      const response = await this.repository.editById(item);

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
