import type { Request, Response, NextFunction } from 'express';
import * as pantryService from "../services/pantryService.ts";
import { successResponse } from "../models/responseModel.ts";

export const getAllGenericNames = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const names = await pantryService.getAllGenericNames();

    res.status(200).json(successResponse(names, 'Retrieved all names successfully'))
  } catch (err) {
    next(err)
  }
}
