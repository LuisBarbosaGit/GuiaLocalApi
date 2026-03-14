import { SupabaseClient } from '@supabase/supabase-js';
import { reviewsDTO } from '../../../domain/entities/reviews-entity.js';
import { IReviwes } from '../../../domain/repositories/reviews.js';

export class reviewsRepository implements IReviwes {
  private db: SupabaseClient<any, 'public', 'public', any, any>;
  constructor(db: SupabaseClient<any, 'public', 'public', any, any>) {
    this.db = db;
  }

  async post(review: reviewsDTO): Promise<reviewsDTO> {
    const { data, error } = await this.db
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async editbyId(review: reviewsDTO): Promise<reviewsDTO> {
    const { data, error } = await this.db
      .from('reviews')
      .update({
        comment: review.comment,
        stars: review.stars,
        user: review.user,
      })
      .eq('id', review.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async deletebyId(id: string): Promise<void> {
    const { error } = await this.db.from('reviews').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
