import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { orderZodValidation } from "./order.validation";
import { ordersController } from "./orders.controller";

const router = express.Router();

router.post(
  "/orders",
  validateRequest(orderZodValidation.createOrder),
  ordersController.createOrder
);


router.get("/orders", ordersController.getAllOrders);

export const OrderRoutes = router;
