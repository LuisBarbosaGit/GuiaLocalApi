import { updateCategoryUseCase } from '../../../application/categories/update-category-use-case.js';
import { categoriesRepository } from '../../repositories/supabase/categories-repository.js';

export const updateCategoryFactory = () => {
  const repo = new categoriesRepository();
  return new updateCategoryUseCase(repo);
};
