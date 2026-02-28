import { getAllCategoriesUseCase } from '../../../application/categories/get-all-categories-use-case.js';
import { categoriesRepository } from '../../repositories/supabase/categories-repository.js';

export const getAllCategoryFactory = () => {
  const repo = new categoriesRepository();
  return new getAllCategoriesUseCase(repo);
};
