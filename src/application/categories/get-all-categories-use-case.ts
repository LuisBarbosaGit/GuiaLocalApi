import { ICategories } from '../../domain/repositories/categories.js';

export class getAllCategoriesUseCase {
  constructor(private repository: ICategories) {}

  async execute() {
    const categories = await this.repository.getAll();

    return categories;
  }
}
