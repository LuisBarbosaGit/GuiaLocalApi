import { deleteCategoryUseCase } from '../../../application/categories/delete-category-use-case.js';
import { categoriesRepository } from '../../repositories/supabase/categories-repository.js';

export const deleteCategoryFactory = () => {
  const repo = new categoriesRepository();
  return new deleteCategoryUseCase(repo);
};
