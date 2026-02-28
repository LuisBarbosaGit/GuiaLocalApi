import { ICategories } from '../../domain/repositories/categories.js';

export class createCategoryUseCase {
  constructor(private repository: ICategories) {}

  async execute(name: string) {
    const category = await this.repository.create(name);

    return category;
  }
}
