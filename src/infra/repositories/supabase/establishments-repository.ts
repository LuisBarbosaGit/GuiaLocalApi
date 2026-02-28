import {
  establishmentsType,
  updateEstablishmentsDTO,
} from '../../../domain/repositories/establishments.js';
import db from '../../../lib/supabase.js';
import { AppError } from '../../../shared/errors/AppError.js';
import { ErrorsType } from '../../../utils/errorsType.js';

export interface establishmentRepositorySchema {
  create(data: establishmentsType): Promise<establishmentsType>;
  listAll(): Promise<establishmentsType[]>;
  getById(id: string): Promise<establishmentsType>;
  editById(id: string, item: establishmentsType): Promise<establishmentsType>;
  delete(id: string): Promise<null>;
  getByCategory(categoryId: string): Promise<establishmentsType[]>;
}

export class establishmentRepository implements establishmentRepositorySchema {
  async create(item: establishmentsType): Promise<establishmentsType> {
    const { data, error } = await db
      .from('establishments')
      .insert(item)
      .select()
      .single();

    if (error) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }

    return data;
  }

  async listAll(): Promise<establishmentsType[]> {
    const { data, error } = await db
      .from('establishments')
      .select()
      .order('created_at');

    if (error) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }

    return data;
  }

  async getById(id: string): Promise<establishmentsType> {
    const { data, error } = await db
      .from('establishments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }

    return data;
  }

  async editById(
    id: string,
    item: updateEstablishmentsDTO,
  ): Promise<establishmentsType> {
    const { data, error } = await db
      .from('establishments')
      .update({
        name: item.name,
        description: item.description,
        adress: item.adress,
        category_id: item.category_id,
        city : item.city,
        state: item.state,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }

    return data;
  }

  async delete(id: string): Promise<null> {
    const { data, error } = await db
      .from('establishments')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }

    return data;
  }

  async getByCategory(categoryId: string): Promise<establishmentsType[]> {
    const { data, error } = await db
      .from('establishments')
      .select('*')
      .eq('category_id', categoryId);

    if (error) {
      throw new AppError({
        code: 500,
        status: ErrorsType.INTERNAL_SERVER_ERROR,
        details: error.message,
      });
    }

    return data;
  }
}
