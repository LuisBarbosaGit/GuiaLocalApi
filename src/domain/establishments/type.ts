export type establishmentsSchema = {
  id: string;
  name: string;
  description: string;
  category_id: string;
  adress: string;
};

export interface establishmentRepositorySchema {
  create(data: establishmentsSchema): Promise<establishmentsSchema>;
  listAll(): Promise<establishmentsSchema[]>;
  listById(id: string): Promise<establishmentsSchema>;
  editById(item: establishmentsSchema): Promise<establishmentsSchema>;
  delete(id: string): Promise<null>;
}
