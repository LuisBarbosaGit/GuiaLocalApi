import { IReviwes } from '../../domain/repositories/reviews.js';
import { AppError } from '../../shared/errors/AppError.js';

export class deleteReviewUseCase {
  constructor(private repo: IReviwes) {}

  async execute(id: string) {
    try {
      await this.repo.deletebyId(id);
    } catch (error) {
      throw new AppError({
        code: 404,
        status: 'Process Error',
        details: 'An error occured during review delete process',
      });
    }
  }
}
