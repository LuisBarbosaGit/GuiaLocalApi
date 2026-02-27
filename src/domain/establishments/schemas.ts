import { z } from 'zod';

export type establishmentsType = {
  id?: string;
  name: string;
  description: string;
  category_id: string;
  adress: string;
};

export const createEstablishmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
  category_id: z.string(),
  adress: z.string().optional(),
});

export type createEstablishmentsDTO = z.infer<typeof createEstablishmentSchema>;

export const updateEstablishmentsSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
  category_id: z.string(),
  adress: z.string().optional(),
});

export type updateEstablishmentsDTO = z.infer<typeof updateEstablishmentsSchema>;
