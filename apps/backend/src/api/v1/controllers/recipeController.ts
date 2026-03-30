import type { Request, Response, NextFunction } from 'express';
import * as recipeService from "../services/recipeService.ts";
import { successResponse } from '../models/responseModel.ts';

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json(successResponse(newRecipe, "Recipe created successfully"))
  } catch (err) {
    next(err)
  }

}
