import { establishmentsType } from '../../domain/repositories/establishments.js';
import { establishmentRepositorySchema } from '../../infra/repositories/supabase/establishments-repository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { ErrorsType } from '../../utils/errorsType.js';

export class createEstablishmentUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(data: establishmentsType) {
    const establishment = data;

    if (!establishment) {
      throw new AppError({
        code: 400,
        status: ErrorsType.VALIDATION_ERROR,
        details: 'Data is missing',
      });
    }

    try {
      const response = this.repository.create(establishment);
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
