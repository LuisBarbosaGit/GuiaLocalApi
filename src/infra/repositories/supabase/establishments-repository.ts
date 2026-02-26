import {
  establishmentsSchema,
} from '@/domain/establishments/type';
import db from '../../../lib/supabase';

export interface establishmentRepositorySchema {
  create(data: establishmentsSchema): Promise<establishmentsSchema>;
  listAll(): Promise<establishmentsSchema[]>;
  getById(id: string): Promise<establishmentsSchema>;
  editById(item: establishmentsSchema): Promise<establishmentsSchema>;
  delete(id: string): Promise<null>;
  getByCategory(categoryId: string): Promise<establishmentsSchema[]>;
}

export class establishmentRepository implements establishmentRepositorySchema {
  async create(item: establishmentsSchema): Promise<establishmentsSchema> {
    const { data, error } = await db
      .from('establishments')
      .insert(item)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async listAll(): Promise<establishmentsSchema[]> {
    const { data, error } = await db
      .from('establishments')
      .select()
      .order('created_at');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getById(id: string): Promise<establishmentsSchema> {
    const { data, error } = await db
      .from('establishments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async editById(item: establishmentsSchema): Promise<establishmentsSchema> {
    const { data, error } = await db
      .from('establishments')
      .update(item)
      .eq('id', item.id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async delete(id: string): Promise<null> {
    const { data, error } = await db
      .from('establishments')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getByCategory(categoryId: string): Promise<establishmentsSchema[]> {
    const { data, error } = await db
      .from('establishments')
      .select('*')
      .eq('category_id', categoryId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
