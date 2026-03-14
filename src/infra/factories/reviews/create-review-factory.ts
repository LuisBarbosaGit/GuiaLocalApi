import { reviewsRepository } from '../../repositories/supabase/reviews-repository.js';
import db from '../../../lib/supabase.js';
import { createReviewsUseCase } from '../../../application/rewiews/create-review-use-case.js';

export const createReviewsFactory = () => {
  const repo = new reviewsRepository(db);
  return new createReviewsUseCase(repo);
};
