import { reviewsRepository } from '../../repositories/supabase/reviews-repository.js';
import db from '../../../lib/supabase.js';
import { deleteReviewUseCase } from '../../../application/rewiews/delete-review-use-case.js';

export const deleteReviewsFactory = () => {
  const repo = new reviewsRepository(db);
  return new deleteReviewUseCase(repo);
};
