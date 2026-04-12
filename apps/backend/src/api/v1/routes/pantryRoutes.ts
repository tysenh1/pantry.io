import express, { Router } from "express";
import * as pantryController from "../controllers/pantryController.ts";

const router: Router = express.Router();

router.get('/generic-names', pantryController.getAllGenericNames)

router.post('/quick-add', pantryController.quickAdd)

export default router
