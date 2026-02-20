import { establishmentsSchema } from '@/types/establishments';
import db from '../lib/supabase';

class establishmentRepository {
  static createEstablishment = async (
    item: establishmentsSchema,
  ): Promise<establishmentsSchema> => {
    const { data, error } = await db
      .from('establishments')
      .insert(item)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };
}

export default establishmentRepository;
