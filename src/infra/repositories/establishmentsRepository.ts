import {
  establishmentRepositorySchema,
  establishmentsSchema,
} from "@/domain/establishments/type";
import db from "../../lib/supabase";

export class establishmentRepository implements establishmentRepositorySchema {
  async create(item: establishmentsSchema): Promise<establishmentsSchema> {
    const { data, error } = await db
      .from("establishments")
      .insert(item)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
