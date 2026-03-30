import express, { Router } from "express";
import * as recipeController from "../controllers/recipeController";

const router: Router = express.Router();

router.post("/", recipeController.createRecipe)

export default router
