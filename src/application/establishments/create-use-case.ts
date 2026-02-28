import { establishmentsType } from '../../domain/repositories/establishments.js';
import { establishmentRepositorySchema } from '../../infra/repositories/supabase/establishments-repository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { ErrorsType } from '../../utils/errorsType.js';

export class createEstablishmentUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(data: establishmentsType) {
    const establishment = data;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!establishment) {
      throw new AppError({
        code: 400,
        status: ErrorsType.VALIDATION_ERROR,
        details: 'Data is missing',
      });
    }

    const { name, description, category_id } = establishment;

    if (!name || !category_id || !description) {
      throw new AppError({
        code: 400,
        status: ErrorsType.VALIDATION_ERROR,
        details: 'Required fields are missing',
      });
    }

    const isValidUuid = uuidRegex.test(category_id);

    if (!isValidUuid) {
      throw new AppError({
        code: 400,
        status: ErrorsType.VALIDATION_ERROR,
        details: 'Invalid UUID format for category_id',
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
