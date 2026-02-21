import { establishmentRepositorySchema } from '@/domain/establishments/type';

export class selectEstablishmentsUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute() { //To do: Add token and pagination
    try {
      const response = await this.repository.listAll();

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
