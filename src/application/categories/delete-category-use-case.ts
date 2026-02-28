import { ICategories } from '../../domain/repositories/categories.js';

export class deleteCategoryUseCase {
  constructor(private repository: ICategories) {}

  async execute(id: string) {
    const category = await this.repository.delete(id);

    return category;
  }
}
