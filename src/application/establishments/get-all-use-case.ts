import { establishmentRepositorySchema } from '../../infra/repositories/supabase/establishments-repository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { ErrorsType } from '../../utils/errorsType.js';

export class getAllEstablishmentsUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute() {
    //To do: Add token and pagination
    try {
      const response = await this.repository.listAll();

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
