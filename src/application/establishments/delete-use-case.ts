import { establishmentRepositorySchema } from "@/infra/repositories/supabase/establishments-repository";


export class deleteEstablishmentsUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(id: string) {
    //To do: Add token and pagination
    try {
      const response = await this.repository.delete(id);

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
