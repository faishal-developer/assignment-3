import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { cowsZodValidataion } from "./cow.validation";
import { cowsController } from "./cow.controller";

const router = express.Router();

router.post(
  "/cows",
  validateRequest(cowsZodValidataion.createCow),
  cowsController.createCow
);

router.get("/cows/:id", cowsController.getSingleCow);
router.delete("/cows/:id", cowsController.deleteCow);
router.patch(
  "/cows/:id",
  validateRequest(cowsZodValidataion.updateCow),
  cowsController.updateCow
);

router.get("/cows", cowsController.getAllCows);

export const CowRoutes = router;
