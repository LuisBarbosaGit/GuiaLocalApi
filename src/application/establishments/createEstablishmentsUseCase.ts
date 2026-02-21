import { establishmentRepositorySchema, establishmentsSchema } from "@/domain/establishments/type";

export class createEstablishmentUseCase {
  constructor(private repository: establishmentRepositorySchema) {}

  async execute(data: establishmentsSchema) {
    const establishment = data;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!establishment) {
      throw new Error("Required fields are missing");
    }

    const { name, description, category_id } = establishment;

    if (!name || !category_id || !description) {
      throw new Error("Required fields are missing");
    }

    const isValidUuid = uuidRegex.test(category_id);

    if (!isValidUuid) {
      throw new Error("Required fields are missing");
    }

    try {
      const response = this.repository.create(establishment);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
