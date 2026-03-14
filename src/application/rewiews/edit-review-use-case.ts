import { reviewsDTO } from '../../domain/entities/reviews-entity.js';
import { IReviwes } from '../../domain/repositories/reviews.js';
import { getByIdEstablishmentFactory } from '../../infra/factories/establishments/get-by-id-establishments-use-case.js';
import { AppError } from '../../shared/errors/AppError.js';

export class editReviewUseCase {
  constructor(private repo: IReviwes) {}

  async execute(review: reviewsDTO) {
    const getEstablishmentUseCase = getByIdEstablishmentFactory();
    const establishment = getEstablishmentUseCase.execute(
      review.establishmentId,
    );

    if (!establishment) {
      throw new AppError({
        code: 404,
        status: 'Entity not Found',
        details: 'establishment not found;',
      });
    }

    const response = await this.repo.editbyId(review);

    return response;
  }
}
