import { createCategoryUseCase } from "../../../application/categories/create-category-use-case.js";
import { categoriesRepository } from "../../repositories/supabase/categories-repository.js"


export const createCategoryFactory = () => {
    const repo = new categoriesRepository()
    return new createCategoryUseCase(repo);
}