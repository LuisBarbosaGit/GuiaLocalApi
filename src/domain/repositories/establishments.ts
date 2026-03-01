import { z } from 'zod';

export type establishmentsType = {
  id?: string;
  name: string;
  description: string;
  category_id: string;
  adress?: string;
  city: string;
  state: string;
};

export const createEstablishmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
  category_id: z.string(),
  adress: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
});

export type createEstablishmentsDTO = z.infer<typeof createEstablishmentSchema>;

export const establishmentSchemaResponse = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  description: z.string().min(5),
  category_id: z.string(),
  adress: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
});

export const updateEstablishmentsSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
  category_id: z.string(),
  adress: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
});

export type updateEstablishmentsDTO = z.infer<
  typeof updateEstablishmentsSchema
>;
