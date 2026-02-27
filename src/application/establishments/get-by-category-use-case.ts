import { establishmentRepositorySchema } from '../../infra/repositories/supabase/establishments-repository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { ErrorsType } from '../../utils/errorsType.js';

export class getEstablishmentsByCategoryUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(id: string) {
    //To do: Add token and pagination
    try {
      const response = await this.repository.getByCategory(id);

      return response;
    } catch (error: any) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }
  }
}
