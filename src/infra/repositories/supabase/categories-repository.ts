import { categoryDTO } from '../../../domain/entities/category-entity.js';
import { ICategories } from '../../../domain/repositories/categories.js';
import db from '../../../lib/supabase.js';

export class categoriesRepository implements ICategories {
  async create(name: string): Promise<void> {
    const {data, error} = await db.from('categories').insert({name}).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
  }

  async getAll(): Promise<categoryDTO[]> {
    const {data, error} = await db.from('categories').select();

    if (error) {
        throw new Error(error.message);
    }
    
    return data;
  }

  async delete(id: string): Promise<void> {
    const {error} = await db.from('categories').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
  }

  async update(id: string, name: string): Promise<categoryDTO> {
    const {data, error} = await db.from('categories').update({name}).eq('id', id).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
  }
}
