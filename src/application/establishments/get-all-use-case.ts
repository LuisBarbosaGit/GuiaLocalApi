import { establishmentRepositorySchema } from "@/infra/repositories/supabase/establishments-repository";


export class getAllEstablishmentsUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute() {
    //To do: Add token and pagination
    try {
      const response = await this.repository.listAll();

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
