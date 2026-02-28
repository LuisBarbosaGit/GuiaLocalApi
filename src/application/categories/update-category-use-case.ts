import { ICategories } from '../../domain/repositories/categories.js';

export class updateCategoryUseCase {
  constructor(private repository: ICategories) {}

  async execute(id: string, name: string) {
    const category = await this.repository.update(id, name);

    return category;
  }
}
