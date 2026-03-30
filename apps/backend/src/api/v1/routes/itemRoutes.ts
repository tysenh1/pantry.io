import express, { Router } from "express";
import * as itemController from "../controllers/itemController.ts";

const router: Router = express.Router();

router.post("/", itemController.createItem);

router.post('/barcodeTest', itemController.barcodeTest)

router.put("/:id", itemController.updateItem);

export default router;
