import { establishmentRepositorySchema } from '../../infra/repositories/supabase/establishments-repository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { ErrorsType } from '../../utils/errorsType.js';

export class getEstablishmentByIdUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(id: string) {
    try {
      const data = await this.repository.getById(id);

      return data;
    } catch (error: any) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }
  }
}
