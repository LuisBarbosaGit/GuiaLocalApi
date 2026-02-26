import { establishmentRepositorySchema } from "@/infra/repositories/supabase/establishments-repository";


export class getEstablishmentByIdUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(id: string) {
    try {
      const data = await this.repository.getById(id);

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
