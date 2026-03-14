import { reviewsRepository } from '../../repositories/supabase/reviews-repository.js';
import db from '../../../lib/supabase.js';
import { editReviewUseCase } from '../../../application/rewiews/edit-review-use-case.js';

export const editReviewsFactory = () => {
  const repo = new reviewsRepository(db);
  return new editReviewUseCase(repo);
};
