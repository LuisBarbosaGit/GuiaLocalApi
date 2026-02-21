export type establishmentsSchema = {
  name: string;
  description: string;
  category_id: string;
  adress: string;
};

export interface establishmentRepositorySchema {
  create(
    data: establishmentsSchema,
  ): Promise<establishmentsSchema>;
}
