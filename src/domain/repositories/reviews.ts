import z from 'zod';
import { reviewsDTO } from '../entities/reviews-entity.js';

export interface IReviwes {
  post(review: reviewsDTO): Promise<reviewsDTO>;
  editbyId(review: reviewsDTO): Promise<reviewsDTO>;
  deletebyId(id: string): Promise<void>;
}

export const createreviewsSchema = z.object({
  user: z.string().min(3),
  comment: z.string().min(5),
  stars: z.number().min(1).max(5),
  establishmentId: z.string(),
});

export type createreviewsDTO = z.infer<typeof createreviewsSchema>;

export const editreviewsSchema = z.object({
  id: z.uuid(),
  user: z.string().min(3),
  comment: z.string().min(5),
  stars: z.number().min(1).max(5),
  establishmentId: z.string(),
});

export type editreviewsDTO = z.infer<typeof createreviewsSchema>;

export const deletereviewsSchema = z.object({
  id: z.uuid(),
});

export type deletereviewsDTO = z.infer<typeof createreviewsSchema>;
