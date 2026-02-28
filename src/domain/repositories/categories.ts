import z from 'zod';
import { categoryDTO } from '../entities/category-entity.js';

export interface ICategories {
  create(name: string): Promise<void>;
  getAll(): Promise<categoryDTO[]>;
  delete(id: string): Promise<void>;
  update(id: string, name: string): Promise<categoryDTO>;
}

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

export type createCategoryDTO = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().min(1),
});

export type updateCategoryDTO = z.infer<typeof updateCategorySchema>;
